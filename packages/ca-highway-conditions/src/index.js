import cmdline from 'commander';
import Parse from 'ca-highway-conditions-parser';
import fetch from 'isomorphic-fetch';
import chalk from 'chalk';
import { version, config } from '../package.json';

const URL = process.env.npm_package_config_url || config.url;

const Color = Object.freeze({
    highway: chalk.bold.underline,
    title: chalk.bold,
    text: chalk.dim
});

const empty = (highway) => ({
    type: '',
    highway,
    notices: [{ title: `No notices for ${highway}`, messages: [] }]
});

const colorize = (conditions) => {
    return Object.assign({
        highway: Color.highway(`${conditions.type}${conditions.highway}`),
        notices: conditions.notices.map((notice) => ({
            title: Color.title(notice.title),
            messages: notice.messages.map((message) => Color.text('• ' + message))
        }))
    });
};

const prettyFormat = (conditions) => {
    const notices = conditions.notices.reduce((state, notice) => [
        ...state,
        `${notice.title}${notice.messages.length ? '\n' : ''}${notice.messages.join('\n')}`
    ], []);

    return `${conditions.highway}\n${notices.join('\n')}`;
};

const fetchData = (url) => fetch(url).then(response => {
    return response.ok ? response.text() : Promise.reject(`Failed to fetch data: ${response.statusText}`);
});

const execute = (highways, options) => (
    fetchData(URL)
        .then(Parse)
        .then(conditions => highways.reduce((state, highway) => [...state, conditions[highway] || empty(highway)].filter(Boolean), {}))
        .then(conditions => options.noColors ? conditions : conditions.map(colorize))
        .then(conditions => conditions.map(prettyFormat))
        .then(
            (conditions) => console.log(conditions.join('\n\n')),
            (error) => console.error(error)
        )
);

cmdline
    .version(version)
    .arguments('<highway...>')
    .option('-n, --no-colors', 'No colors in output')
    .action(execute)
    .parse(process.argv);

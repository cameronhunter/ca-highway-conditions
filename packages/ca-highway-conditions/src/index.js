import cmdline from 'commander';
import fetch from 'ca-highway-conditions-fetcher';
import parse from 'ca-highway-conditions-parser';
import chalk from 'chalk';
import { version, config } from '../package.json';

const flatten = (arr) => arr.reduce((state, items) => [...state, ...items], []);

const Color = Object.freeze({
    highway: chalk.bold.underline,
    title: chalk.bold,
    text: chalk.dim
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

const identity = i => i;

const execute = (highways, options) => {
    fetch(highways).then((results) => {
        return Promise.all(highways.map((number) => {
            return Promise.all(results[number].map((highway) => {
                return parse(highway.body).catch((e) => []);
            }));
        }));
    }).then(flatten).then((results) => {
        console.log(flatten(results).map(options.noColors ? identity : colorize).map(prettyFormat).join('\n\n'));
    });
};

cmdline
    .version(version)
    .arguments('<highway...>')
    .option('-n, --no-colors', 'No colors in output')
    .action(execute)
    .parse(process.argv);

import cmdline from 'commander';
import Parse from 'ca-highway-conditions-parser';
import fetch from 'isomorphic-fetch';
import chalk from 'chalk';

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

const format = (conditions) => {
    const notices = conditions.notices.reduce((state, notice) => [
        ...state,
        `${notice.title}${notice.messages.length ? '\n' : ''}${notice.messages.join('\n')}`
    ], []);

    return `${conditions.highway}\n${notices.join('\n')}`;
};

const execute = (highways) => (
    fetch('http://www.dot.ca.gov/cgi-bin/roadlt')
        .then(response => response.text())
        .then(Parse)
        .then(conditions => highways.reduce((state, highway) => [...state, conditions[highway] || empty(highway)].filter(Boolean), {}))
        .then(conditions => conditions.map(colorize))
        .then(conditions => conditions.map(format))
        .then(conditions => console.log(conditions.join('\n\n')))
);

cmdline
    .arguments('<highway...>')
    .action(execute)
    .parse(process.argv);

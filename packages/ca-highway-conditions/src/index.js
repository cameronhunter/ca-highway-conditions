import cmdline from 'commander';
import Parse from 'ca-highway-conditions-parser';
import fetch from 'isomorphic-fetch';

const execute = (highways) => {
    return fetch('http://www.dot.ca.gov/cgi-bin/roadlt').then(response => response.text()).then(text => {
        return Parse(text);
    }).then(conditions => {
        console.log(conditions);
    })
};

cmdline
    .arguments('<highway...>')
    .action(execute)
    .parse(process.argv);

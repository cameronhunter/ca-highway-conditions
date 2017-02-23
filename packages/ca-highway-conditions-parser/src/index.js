import Parser from './grammar.pegjs';
import tmp from 'tmp';

export default (input, options) => {
    const cleanInput = input && input.replace(/\r/g, '');
    try {
        return Promise.resolve(Parser.parse(cleanInput));
    } catch (e) {
        const { log = tmp.dirSync() } = options || {};

        const banner = new Array(80).fill('*').join('');
        fs.appendFileSync(path.join(log.name, 'error.log'), JSON.stringify(e, null, 2));
        fs.appendFileSync(path.join(log.name, 'input.txt'), [banner, input, banner, '\n'].join('\n'));

        console.error(`See "${log.name}" directory for further error details.`);

        return Promise.reject(`Failed to parse input: ${e}`);
    }
};

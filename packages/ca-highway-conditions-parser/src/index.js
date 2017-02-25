import Parser from './grammar.pegjs';

export default (input, options) => {
    return new Promise((resolve, reject) => {
        const cleanInput = input && input.replace(/\r/g, '');

        if (!cleanInput || !cleanInput.replace(/[\s]/g, '')) {
            return reject('No data found');
        }

        try {
            return resolve(Parser.parse(cleanInput));
        } catch (e) {
            return reject('Failed to parse road conditions');
        }
    });
};

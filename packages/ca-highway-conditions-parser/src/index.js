import Parser from './grammar.pegjs';

export default (input) => {
    return Parser.parse(input && input.replace(/\r/g, ''));
};

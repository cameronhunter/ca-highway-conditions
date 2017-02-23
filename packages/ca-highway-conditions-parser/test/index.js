import test from 'ava';
import parse from '../';
import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-fetch';

test('Parses text fixture', t => {
    const data = fs.readFileSync(path.join(__dirname, 'fixture', 'data.txt'), 'utf-8');
    const parsed = parse(data);

    t.truthy(parsed);
});

test('Parses HTML fixture', t => {
    const data = fs.readFileSync(path.join(__dirname, 'fixture', 'data.html'), 'utf-8');
    const parsed = parse(data);

    t.truthy(parsed);
});

test('Parses real fixture', t => {
    const data = fs.readFileSync(path.join(__dirname, 'fixture', 'roadlt.html'), 'utf-8');
    const parsed = parse(data);

    t.truthy(parsed);
});

import test from 'ava';
import parse from '../';
import fs from 'fs';
import path from 'path';

test('Parses data', t => {
    const data = fs.readFileSync(path.join(__dirname, 'fixture', 'data.txt'), 'utf-8');
    const parsed = parse(data);

    t.truthy(parsed);
});

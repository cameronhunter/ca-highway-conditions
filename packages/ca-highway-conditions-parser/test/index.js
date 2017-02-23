import test from 'ava';
import parse from '../';
import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-fetch';

test('Parses text fixture', t => {
    const data = fs.readFileSync(path.join(__dirname, 'fixture', 'data.txt'), 'utf-8');
    return parse(data).then(parsed => t.truthy(parsed));
});

test('Parses HTML fixture', t => {
    const data = fs.readFileSync(path.join(__dirname, 'fixture', 'data.html'), 'utf-8');
    return parse(data).then(parsed => t.truthy(parsed));
});

test('Parses real fixture', t => {
    const data = fs.readFileSync(path.join(__dirname, 'fixture', 'roadlt.html'), 'utf-8');
    return parse(data).then(parsed => t.truthy(parsed));
});

test('Chain control', t => {
    const data = fs.readFileSync(path.join(__dirname, 'fixture', 'data.txt'), 'utf-8');
    return parse(data).then(parsed => {
        t.deepEqual(parsed[267], {
            type: 'SR',
            highway: '267',
            notices: [
                {
                    title: 'IN THE NORTHERN CALIFORNIA AREA',
                    messages: [
                        'CHAINS OR SNOW TIRES ARE REQUIRED FROM TRUCKEE (NEVADA CO) TO KINGS BEACH (PLACER CO)',
                        'PLEASE RESEARCH CHAIN CONTROL LOCATIONS AS CALTRANS IS CURRENTLY WORKING TO UPDATE CHAIN CONTROL DESCRIPTIONS FOR CONSISTENCY WITH INTERNET MAPPING, LIKE GOOGLE MAPS & MAPQUEST.'
                    ]
                }
            ]
        });
    });
});

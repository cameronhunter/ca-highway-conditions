import fetch from 'isomorphic-fetch';

const flatten = (arr) => arr.reduce((state, items) => [...state, ...items], []);

export const fetchHighway = (number, type) => {
    if (!type) {
        const types = ['I', 'SR', 'US'];
        return Promise.all(types.map(t => fetchHighway(number, t))).then((results) => {
            return flatten(results);
        });
    }

    const create = (response, body) => {
        if (!response.ok) {
            return [];
        } else {
            return [{
                ok: response.ok,
                status: response.status,
                statusText: response.statusText,
                payload: {
                    type: type.toUpperCase(),
                    number,
                    ...(body ? { body: body.replace(/[\r]/g, '') } : {})
                }
            }];
        }
    };

    return fetch(`http://www.dot.ca.gov/hq/roadinfo/${type}${number}`.toLowerCase()).then((response) => {
        return response.ok ? response.text().then((data) => create(response, data)) : create(response);
    }).catch((e) => {
        return create({ ok: false, status: 500, statusText: e });
    });
};

export default (highways) => {
    const responses = highways.map(number => fetchHighway(number));
    return Promise.all(responses).then(flatten).then((results) => {
        return results.reduce((state, result) => ({
            ...state,
            [result.payload.number]: [...(state[result.payload.number] || []), result.payload]
        }), {});
    }).then((results) => {
        return highways.reduce((state, highway) => ({
            ...state,
            [highway]: [...(state[highway] || []), ...(results[highway] || [])]
        }), []);
    });
};

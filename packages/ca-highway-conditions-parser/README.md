# ca-highway-conditions-parser
[![NPM Version](https://img.shields.io/npm/v/ca-highway-conditions-parser.svg)](https://npmjs.org/package/ca-highway-conditions-parser)

## Installation
```
$ npm install --save ca-highway-conditions-parser
```

## Usage

### Parsing
```javascript
import parser from 'ca-highway-conditions-parser';

const input = `
SR 20
    [IN THE NORTHERN CALIFORNIA AREA]
    1-WAY CONTROLLED TRAFFIC FROM 5.5 MI EAST OF THE JCT OF SR 16 TO "E" ST
/IN WILLIAMS/ (COLUSA CO) - DUE TO FLOODING
`;

parser(input).then(
  (notices) => console.log(notices[20]),
  (error) => console.error(`Failed to parse input: ${error}`)
);
```

### Output
```json
{
    "20": {
        "type": "SR",
        "highway": "20",
        "notices": [
            {
                "title": "IN THE NORTHERN CALIFORNIA AREA",
                "messages": [
                    "1-WAY CONTROLLED TRAFFIC FROM 5.5 MI EAST OF THE JCT OF SR 16 TO \"E\" ST /IN WILLIAMS/ (COLUSA CO) - DUE TO FLOODING"
                ]
            }
        ]
    }
}
```

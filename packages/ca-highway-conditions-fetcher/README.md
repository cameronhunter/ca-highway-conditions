# ca-highway-conditions-fetcher

## Installation
```
$ npm install --save ca-highway-conditions-fetcher
```

## Usage

### Parsing
```javascript
import fetch from 'ca-highway-conditions-fetcher';

fetch(17, 80).then(
  (results) => console.log(results),
  (error) => console.error(error)
);
```

### Output
```json
{
    "17": [
      {
          "ok": false,
          "status": 404,
          "statusText": "Not Found",
          "payload": {
            "type": "I",
            "number": "17"
          }
      },
      {
          "ok": true,
          "status": 200,
          "statusText": "OK",
          "payload": {
            "type": "SR",
            "number": "17",
            "body": "…"
          }
      },
      {
          "ok": false,
          "status": 404,
          "statusText": "Not Found",
          "payload": {
            "type": "US",
            "number": "17"
          }
      }
    ],
    "80": [
      {
          "ok": true,
          "status": 200,
          "statusText": "OK",
          "payload": {
            "type": "I",
            "number": "80",
            "body": "…"
          }
      },
      {
          "ok": false,
          "status": 404,
          "statusText": "Not Found",
          "payload": {
            "type": "SR",
            "number": "80"
          }
      },
      {
          "ok": false,
          "status": 404,
          "statusText": "Not Found",
          "payload": {
            "type": "US",
            "number": "80"
          }
      }
    ]
}
```

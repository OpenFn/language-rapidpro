# language-rapidpro [<img src="https://avatars2.githubusercontent.com/u/9555108?s=200&v=4)" alt="alt text" height="20">](https://www.openfn.org) [![Build Status](https://travis-ci.org/OpenFn/language-rapidpro.svg?branch=master)](https://travis-ci.org/OpenFn/language-rapidpro)

An OpenFn **_adaptor_** for building integration jobs for use with the
[RapidPro API](https://rapidpro.io/api/v2/).

## Documentation

- View the documentation at https://openfn.github.io/language-rapidpro/
- To update the documentation site, run:
  `./node_modules/.bin/jsdoc --readme ./README.md ./lib -d docs`

## post

#### sample configuration

```json
{
  "host": "https://app.rapidpro.io/",
  "token": "super-secret-token-123"
}
```

#### sample expression using operation

```js
sendBroadcast({
  "text": "Hello friends.",
  "urns": [],
  "contacts": [],
  "groups", [],
});
```

## Development

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `npm run build`.

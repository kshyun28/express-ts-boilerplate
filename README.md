# express-ts-boilerplate

[![Node.js version](https://img.shields.io/badge/Node.js-18.16.0-brightgreen.svg)](https://nodejs.org/docs/latest-v18.x/api/index.html)
[![TypeScript version](https://img.shields.io/badge/TypeScript-4.7.4-brightgreen.svg)](https://www.npmjs.com/package/typescript/v/4.7.4)
[![Express version](https://img.shields.io/badge/Express-4.18.2-brightgreen.svg)](https://www.npmjs.com/package/express/v/4.18.2)
[![npm version](https://img.shields.io/badge/npm-9.6.6-brightgreen.svg)](https://www.npmjs.com/package/npm/v/9.6.6)

A [Node.js](https://nodejs.org/en) [TypeScript](https://www.typescriptlang.org/) boilerplate using [Express](https://expressjs.com/) framework.

## Quickstart

### Sample Application

~~A sample application is currently deployed using [Heroku](https://dashboard.heroku.com/).~~

~~The API is publicly accessible for the meantime at https://express-ts-node-boilerplate.herokuapp.com.~~

The Postman collection is available [here](https://www.postman.com/maintenance-operator-95050553/workspace/public/request/24506889-9e9ee6e6-adbb-4883-8844-1efbb07660b1).

API Documentation is also available [here](https://docs.google.com/document/d/1yTuh0mcu152nVcW8o0t0pbosmiqHLcmbeYJ-NTXR1rU/edit?usp=sharing).

### Local Development

First, configure `.env`:
- MAIL_USERNAME: uses Gmail address for Nodemailer implementation.
- MAIL_PASSWORD: uses [ Gmail app passwords](https://support.google.com/accounts/answer/185833?hl=en).
- MONGODB_URI: uses [MongoDB Atlas URI](https://cloud.mongodb.com/).
- JWT_SECRET: Generate a secure secret offline.
- JWT_EXPIRY: [expiry options](https://github.com/vercel/ms).
- SALT_ROUNDS: [Refer to this SO answer](https://stackoverflow.com/questions/43253392/how-many-rounds-is-the-recommended-for-bcrypt-password-hasing).

Then
1. `npm install`
2. `yarn start:dev`

or
1. `yarn build`
2. `yarn start`

### Build and run Docker image
1. `docker build --tag node-docker .`
2. `docker run -d -p 8000:8000 node-docker`

## Resources
- https://nodejs.org/en
- https://www.typescriptlang.org/
- https://expressjs.com/
- https://www.docker.com/
- https://eslint.org/
- https://prettier.io/
- https://nodemon.io/
- https://commitlint.js.org/
- https://github.com/okonet/lint-staged
- https://typicode.github.io/husky/
- https://github.com/pvdlg/conventional-commit-types
- https://github.com/github/gitignore
- https://github.com/tsconfig/bases/#what-about-combined-configs
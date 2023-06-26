## Description

This is a simple user authentication API written in **Nest.js**.
The API allows users to register, login, and access their own data.

> **_NOTE:_** Use Swagger for API Documentation ({HOST}:{PORT}/api, f.i. http://localhost:3000/api)

## Installation

* Clone the repository
* Create **.env.${process.env.NODE_ENV}** or **.env** file under root using **.env.example** and input credentials (by default NODE_ENV is **development**)
* Run "npm install" command on your system Shell to install necessary packages

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Packages and libraries used

* [config](https://www.npmjs.com/package/@nestjs/config)
* [mongoose](https://mongoosejs.com)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [class-transformer](https://www.npmjs.com/package/class-transformer)
* [class-validator](https://www.npmjs.com/package/class-validator)
* [lodash](https://www.npmjs.com/package/lodash)
* [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
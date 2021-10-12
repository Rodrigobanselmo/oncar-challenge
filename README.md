<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Documentation and Testing

See the documentation at [here](https://oncar-api.herokuapp.com/api/)

https://oncar-api.herokuapp.com/api/

![Alt images](test/images/swagger.png?raw=true 'Title')

# Getting Started

## Requirements

This project uses docker and docker-compose, so before you start you need to have then installed in your machine

## Clone this project

```bash
$ git clone -b main-server --single-branch git@github.com:Rodrigobanselmo/oncar-challenge.git
```

## Installation

```bash
$ npm install
```

## Environment Variables

Create ".env" file as the ".env.example", you can leave the same configuration if you want.

## Database

```bash
$ docker-compose up -d postgres
```

```bash
$ npm run migrate
```

## Running the app

```bash
# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Unit Tests

![Alt images](test/images/unit.png?raw=true 'Title')

### E2E

![Alt images](test/images/e2e.png?raw=true 'Title')

Nest is [MIT licensed](LICENSE).

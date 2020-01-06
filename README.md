# crimemap-sync-api &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/paulosales/crimemap-sync-api/blob/master/LICENSE) [![Build Status](https://travis-ci.com/paulosales/crimemap-sync-api.svg?branch=master)](https://travis-ci.com/paulosales/crimemap-sync-api) [![codecov](https://codecov.io/gh/paulosales/crimemap-sync-api/branch/master/graph/badge.svg)](https://codecov.io/gh/paulosales/crimemap-sync-api) [![code factor](https://img.shields.io/codefactor/grade/github/paulosales/crimemap-sync-api/master)](https://www.codefactor.io/repository/github/paulosales/crimemap-sync-api)

The **crimemap-sync-api** is a GraphQL API that exposes services for importing crime data to a crime map database. Use **[crimemap-sync-cli](https://github.com/paulosales/crimemap-sync-cli)** to consumes these services.

## Tech stack

- [Apollo Server](https://github.com/apollographql/apollo-server)
- [Docker](https://www.docker.com/)
- [MochaJs](https://mochajs.org/)
- [PM2](https://pm2.keymetrics.io/)
- [Nodemon](https://nodemon.io/)

## Installation

The **crimemap-sync-api** is dockerized, so you need to have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed in your machine.

Once you have docker and docker-compose installed, now you need to declare the server infraestructure inside a **docker-compose.yml** file. Here is a sample that you can use to raise the **crimemap-sync-api**:

```yaml
version: '3.6'

volumes:
  database_files:
  database_config:

networks:
  network_api:
    driver: bridge

services:
  database:
    image: mongo:4.2
    container_name: database
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: 'mongoadmin'
      MONGO_INITDB_ROOT_PASSWORD: 'mongopwd'
    volumes:
      - database_files:/data/db
      - database_config:/data/configdb
    networks:
      - network_api
    expose:
      - '27017'
  api:
    image: prsales/crimemap-sync-api:latest
    container_name: api
    environment:
      NODE_ENV: 'production'
      DEBUG: ''
      JWT_KEY: 'a_secret_key'
      CORS_CLIENT_ORIGIN: '*'
      DB_HOST: 'database'
      DB_PORT: 27017
      DB_NAME: 'crimemapdb'
      DB_ROOT_USER: 'mongoadmin'
      DB_ROOT_PASS: 'mongopwd'
      DB_USER: 'crimemap'
      DB_PASS: 'crimemappwd'
    links:
      - database
    depends_on:
      - database
    networks:
      - network_api
    ports:
      - '4000:4000'
```

Now, in the same directory of **docker-compose.yml** file type:

```bash
$ docker-compose up -d
Creating network "crimemap_network_api" with driver "bridge"
Creating volume "crimemap_database_files" with default driver
Creating volume "crimemap_database_config" with default driver
Creating database ... done
Creating api      ... done
```

## Configuration

The **crimemap-sync-api** application is distributed as a docker image, so the configuration can be made by setting some environment variables. Here we have the environment variables that you can use:

- **NODE_ENV**
  Use this variable to tell the application where is the environment that it's running on. All possible values are **development**, **testing**, and **production**.

- **DEBUG**
  We set a lot of debug logs through the code. All debug logs had a name to identify them and you can use this environment variable to enable/disable debug logs by name. You can enable all debug logs just setting an **\*** (asterisk) or setting a list of debugging names separated by space or comma. To know more about it, see the [debug README.me](https://github.com/visionmedia/debug#usage) file.

- **JWT_KEY**
  We are using [JSON Web Token](https://jwt.io/) to authorize users to get access to **crimemap-sync-api**. To generate a JWT authorization token we need a secret KEY and you can enter it here.

- **CORS_CLIENT_ORIGIN**
  Here you can set the domain name the can access this API. Use a **\*** (asterisk) to grant access to all domains. To know more about [Cross-origin resource sharing (CORS)](https://pt.wikipedia.org/wiki/Cross-origin_resource_sharing), 👈 click here.

- **DB_HOST**
  The hostname of the mongo database server.

- **DB_PORT**
  The mongo database port. The mongo database default port is **27017**.

- **DB_NAME**
  The database name where the **crimemap-sync-api** will storage the collections.

- **DB_USER**
  The database username.

- **DB_PASS**
  The database password.

## License

[MIT](https://github.com/paulosales/crimemap-sync-api/blob/master/LICENSE) © [paulosales](https://github.com/paulosales/).

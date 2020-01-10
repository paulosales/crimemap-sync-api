# crimemap-sync-api &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/paulosales/crimemap-sync-api/blob/master/LICENSE) [![Build Status](https://travis-ci.com/paulosales/crimemap-sync-api.svg?branch=master)](https://travis-ci.com/paulosales/crimemap-sync-api) [![codecov](https://codecov.io/gh/paulosales/crimemap-sync-api/branch/master/graph/badge.svg)](https://codecov.io/gh/paulosales/crimemap-sync-api) [![code factor](https://img.shields.io/codefactor/grade/github/paulosales/crimemap-sync-api/master)](https://www.codefactor.io/repository/github/paulosales/crimemap-sync-api) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=paulosales_crimemap-sync-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=paulosales_crimemap-sync-api)

The **crimemap-sync-api** is a GraphQL API that exposes services for importing crime data to a crime map database. Use **[crimemap-sync-cli](https://github.com/paulosales/crimemap-sync-cli)** to consumes these services. Here is a usage examplo of the API:

![Preview](images/sync-api.gif)

## Table of contents

[1. Installation](#installation)
[2. Configurarion](#configuration)
[3. Documentation](#documentation)
[4. Tech stack](#tech-stack)
[5. License](#license)

## Installation

The **crimemap-sync-api** is dockerized, so you need to have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed in your machine to raise the API server.

Once you have docker and docker-compose installed, now you need to declare the server infrastructure inside a docker-compose.yml file and create a shell script to initialize the database. Fortunately we create samples of this files to you just download and customize and use it. So, download these files [docker-compose.yml](https://raw.githubusercontent.com/paulosales/crimemap-sync-api/master/scripts/container/docker-compose.yml) and [init.db.sh](https://raw.githubusercontent.com/paulosales/crimemap-sync-api/master/scripts/container/init.db.sh) to same directory and run the command below inside this directory:

```bash
$ docker-compose up -d
Creating network "crimemap_network_api" with driver "bridge"
Creating volume "crimemap_database_files" with default driver
Creating volume "crimemap_database_config" with default driver
Creating database ... done
Creating api      ... done
```

## Configuration

In the **docker-compose.yml** you can configure the **crimemap-sync-api** just setting some environment variables. Here we have the environment variables that you can use:

- **NODE_ENV**

  Use this variable to tell the application where is the environment that it's running on. All possible values are **development**, **testing**, and **production**.

- **DEBUG**

  We set a lot of debug logs through the code. All debug logs had a name to identify them and you can use this environment variable to enable/disable debug logs by name. You can enable all debug logs just setting an **\*** (asterisk) or setting a list of debugging names separated by space or comma. To know more about it, see the [debug README.me](https://github.com/visionmedia/debug#usage) file.

- **JWT_KEY**

  We are using [JSON Web Token](https://jwt.io/) to authorize users to get access to **crimemap-sync-api**. To generate a JWT authorization token we need a secret KEY and you can enter it here.

- **CORS_CLIENT_ORIGIN**

  Here you can set the domain name the can access this API. Use a **\*** (asterisk) to grant access to all domains. Click in the next link to know more about [cross-origin resource sharing (CORS)](https://pt.wikipedia.org/wiki/Cross-origin_resource_sharing).

- **DB_HOST**

  The hostname of the database server.

- **DB_PORT**

  The database port. The mongo database default port is **27017**.

- **DB_NAME**

  The database name where the api application will storage data.

- **DB_USER**

  The database username that you created in the database initialization script.

- **DB_PASS**

  The database password that you created in the database initialization script.

## Documentation

It's a GraphQL API, so we have [queries and mutations](https://graphql.org/learn/queries/) to call the API.
You can see the API documention on the API server playground. To see it, just run da API server in development mode and access the server from a webrowser, i.e., follow the [installation](#installation) procedure and type http://localhost:4000/ in your webrowser.

## Tech stack

- [Apollo Server](https://github.com/apollographql/apollo-server)
- [Docker](https://www.docker.com/)
- [MochaJs](https://mochajs.org/)
- [PM2](https://pm2.keymetrics.io/)
- [Nodemon](https://nodemon.io/)

## License

[MIT](https://github.com/paulosales/crimemap-sync-api/blob/master/LICENSE) © [paulosales](https://github.com/paulosales/).

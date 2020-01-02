# crimemap-sync-api &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/paulosales/crimemap-sync-api/blob/master/LICENSE) [![Build Status](https://travis-ci.com/paulosales/crimemap-sync-api.svg?branch=master)](https://travis-ci.com/paulosales/crimemap-sync-api) [![codecov](https://codecov.io/gh/paulosales/crimemap-sync-api/branch/master/graph/badge.svg)](https://codecov.io/gh/paulosales/crimemap-sync-api)

The **crimemap-sync-api** is a GraphQL API that exposes services for importing crime data to a crime map database. Use **[crimemap-sync-cli](https://github.com/paulosales/crimemap-sync-cli)** to consumes these services.

## Tech stack

- [Apollo Server](https://github.com/apollographql/apollo-server)
- [Docker](https://www.docker.com/)
- [MochaJs](https://mochajs.org/)
- [PM2](https://pm2.keymetrics.io/)
- [Nodemon](https://nodemon.io/)

## Installation

The **crimemap-sync-api** is dockerized, so you need to have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed in your machine.

Once you have docker and docker-compose installed, now you need to declare the server infraestructure inside a **docker-compose.yml** file:

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
      - MONGO_INITDB_ROOT_USERNAME=mongoadmin
      - MONGO_INITDB_ROOT_PASSWORD=mongopwd
      - MONGO_INITDB_USERNAME=crimemap
      - MONGO_INITDB_PASSWORD=crimemappwd
      - MONGO_INITDB_DATABASE=crimemapdb
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

## License

[MIT](https://github.com/paulosales/crimemap-sync-api/blob/master/LICENSE) © [paulosales](https://github.com/paulosales/).

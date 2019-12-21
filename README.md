# crimemap-sync-api &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/paulosales/crimemap-sync-api/blob/master/LICENSE) [![Build Status](https://travis-ci.com/paulosales/crimemap-sync-api.svg?branch=master)](https://travis-ci.com/paulosales/crimemap-sync-api)

The **crimemap-sync-api** is a GraphQL API that exposes services for crime data importing.

## Tech stack

- [Apollo Server](https://github.com/apollographql/apollo-server)
- [Docker](https://www.docker.com/)
- [MochaJs](https://mochajs.org/)
- [PM2](https://pm2.keymetrics.io/)
- [Nodemon](https://nodemon.io/)

## Docker containers

The **crimemap-sync-api** is dockerized, so you can use [docker-compose](https://docs.docker.com/compose/install/) to lauch it inside docker containers. We have docker-compose configuration to development and production environments.

To launch **development** containers, just run:

```bash
$ ./dev.up.sh
Recreating cm_database ... done
Recreating cm_api      ... done
```

To lauch **production** containers, run:

```bash
$ ./prod.up.sh
Creating database ... done
Creating api      ... done
```

To shutdown the containers, run:

```bash
$ docker-compose down
Stopping api      ... done
Stopping database ... done
Removing api      ... done
Removing database ... done
```

## License

[MIT](https://github.com/paulosales/crimemap-sync-api/blob/master/LICENSE) © [paulosales](https://github.com/paulosales/).

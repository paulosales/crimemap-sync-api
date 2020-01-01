/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const debug = require('debug').debug('crimemap-sync-api');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const env = require('../constants/env');

const DEV_MODE = process.env.NODE_ENV === env.DEVELOPMENT;
const TST_MODE = process.env.NODE_ENV === env.TESTING;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: integrationContext => {
    debug('RUNNING context');
    const headers = integrationContext.req.headers;
    const authToken = headers.authorization.substr(7);
    debug('Receiving the auth token %s.', authToken);
    let user = null;
    try {
      user = jwt.verify(authToken, process.env.JWT_KEY);
      debug('The token is valid.');
    } catch (e) {
      debug('The token is not valid');
    }
    return { user };
  },
  subscriptions: {
    path: '/subscriptions',
  },
  cors: {
    origin: process.env.CORS_CLIENT_ORIGIN || '*',
    methods: ['OPTIONS', 'POST'],
    credentials: true,
  },
  playground: DEV_MODE,
  debug: DEV_MODE || TST_MODE,
});

module.exports = server;

/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const env = require('../constants/env');

const DEV_MODE = process.env.NODE_ENV === env.DEVELOPMENT;
const TST_MODE = process.env.NODE_ENV === env.TESTING;

const server = new ApolloServer({
  typeDefs,
  resolvers,
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

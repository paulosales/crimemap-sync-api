/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const mongoose = require('mongoose');
const debug = require('debug')('crimemap-sync-api');

require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const MONGO_CONNECTION_STRING = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

debug(`connecting to ${MONGO_CONNECTION_STRING}`);

mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    debug('connection to mongodb was succeed.');
  });

module.exports = mongoose;

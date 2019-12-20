/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const logger = require('debug')('crimemap-sync-api');
const server = require('./graphql/server');

logger(
  `Starting crimemap-sync-api server in ${process.env.NODE_ENV} environment.`
);

server.listen().then(options => {
  logger(`crimemap-sync-api server ready at ${options.url}`);
  process.stdout.write(`🚀 crimemap-sync-api server ready at ${options.url}\n`);
});

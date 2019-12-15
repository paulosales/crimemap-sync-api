const logger = require('debug')('crimemap-sync-api');
const server = require('./graphql/server');

logger(`Starting crimemap-sync-api server in ${process.env.NODE_ENV} environment.`);

server.listen().then((options) => {
  logger(`crimemap-sync-api server ready at ${options.url}`);
  process.stdout.write(`🚀 crimemap-sync-api server ready at ${options.url}\n`);
});

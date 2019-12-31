/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug')('crimemap-sync-api');
const packageJson = require('../../../package.json');

module.exports = async () => {
  debug('querying info');
  const infoData = {
    name: packageJson.name,
    version: packageJson.version,
    auth: packageJson.auth,
    license: packageJson.license,
    homepage: packageJson.homepage,
  };
  debug('info data sended');
  return infoData;
};

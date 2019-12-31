/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug')('crimemap-sync-api');
const { User } = require('../../database/models/user');

module.exports = async (_, { username, password }) => {
  debug(`${username} is loggin-in`);
  const auth = await User.login(username, password);
  debug(`${username} auth ${JSON.stringify(auth)}`);
  return auth;
};

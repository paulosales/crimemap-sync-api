/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const { User } = require('../../src/database/models/user');
const debug = require('debug')('crimemap-sync-api-test');

module.exports = async function setupTestData() {
  debug('querying users');
  const users = await User.find({}).exec();
  debug(`${users.length} found. removing all.`);
  users.forEach(async user => {
    await user.remove();
  });

  await User.create({
    username: 'johndoe',
    firstName: 'john',
    lastName: 'doe',
    email: 'john@damain.com',
    passwordSalt: 'AGcpm3I5CuDhsZYd9pq/',
    password:
      '$argon2i$v=19$m=4096,t=3,p=1$7i3TC17v/jWx9kF8ZQzbTg$xf4pF4cXyDo3jWH8kg+ncYlb442SK5JtvMZ0erkssAc',
  });
};

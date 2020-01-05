/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const argon2 = require('argon2');
const crypto = require('crypto');
const debug = require('debug')('crimemap-sync-api');
const server = require('./graphql/server');
const { User } = require('./database/models/user');

const adminUser = process.env.SYNC_API_ADMIN_USER;
const adminPassword = process.env.SYNC_API_ADMIN_PASSWORD;

if (adminUser) {
  debug('checking if the admin user %s is in database.', adminUser);
  User.findOne({ username: adminUser })
    .exec()
    .then(async user => {
      if (!user) {
        const passwordSalt = crypto.randomBytes(16).toString('base64');
        const password = await argon2.hash(adminPassword + passwordSalt);
        await User.create({
          firstName: 'john',
          lastName: 'doe',
          username: 'johndoe',
          email: 'johndoe@domain.com',
          roles: ['admin'],
          permissions: ['import', 'remove-import', 'list-imports', 'info'],
          passwordSalt,
          password,
        });
        debug('The user %s created.', adminUser);
      } else {
        debug('The user %s already exists.', adminUser);
      }
    });
}

debug(
  'Starting crimemap-sync-api server in %s environment.',
  process.env.NODE_ENV
);

server.listen().then(options => {
  debug('crimemap-sync-api server ready at %s', options.url);
  process.stdout.write(`🚀 crimemap-sync-api server ready at ${options.url}\n`);
});

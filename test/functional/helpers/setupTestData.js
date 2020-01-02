/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const { User } = require('../../../src/database/models/user');
const { Import } = require('../../../src/database/models/import');
const debug = require('debug')('crimemap-sync-api-test');

module.exports = async function setupTestData() {
  debug('querying users');
  const users = await User.find({}).exec();
  debug('%d found. removing all.', users.length);
  users.forEach(async user => {
    await user.remove();
  });

  debug('creating user jonhdoe.');
  await User.create({
    username: 'johndoe',
    firstName: 'john',
    lastName: 'doe',
    email: 'john@damain.com',
    roles: ['admin'],
    permissions: ['import', 'remove-import', 'list-imports', 'info'],
    passwordSalt: 'AGcpm3I5CuDhsZYd9pq/',
    password:
      '$argon2i$v=19$m=4096,t=3,p=1$7i3TC17v/jWx9kF8ZQzbTg$xf4pF4cXyDo3jWH8kg+ncYlb442SK5JtvMZ0erkssAc',
  });

  debug('creating user foobar.');
  await User.create({
    username: 'foobar',
    firstName: 'foo',
    lastName: 'bar',
    email: 'foo@damain.com',
    passwordSalt: 'AGcpm3I5CuDhsZYd9pq/',
    password:
      '$argon2i$v=19$m=4096,t=3,p=1$7i3TC17v/jWx9kF8ZQzbTg$xf4pF4cXyDo3jWH8kg+ncYlb442SK5JtvMZ0erkssAc',
  });

  debug('querying imports.');
  const imports = await Import.find({}).exec();
  debug('%d imports found. removing all', imports.length);
  imports.forEach(async imp => {
    await imp.remove();
  });

  debug('creating one import.');
  await Import.create({
    startDate: new Date('2019-12-29T16:15:01.338Z'),
    finishDate: new Date('2019-12-29T16:16:22.131Z'),
    status: 'SUCCESS',
    author: {
      username: 'testeuser',
      firstName: 'Test',
      lastName: 'User',
    },
    file: {
      name: 'file.pdf',
      hash: 'fdbec63e92aa80ce1c7a58434226f7a4e47c420cf39972b086ee3cd62b59ffef',
    },
  });
  await Import.create({
    startDate: new Date('2019-12-29T16:20:17.834Z'),
    status: 'RUNNING',
    author: {
      username: 'testeuser',
      firstName: 'Test',
      lastName: 'User',
    },
    file: {
      name: 'file2.pdf',
      hash: 'fdbec63e92aa80ce1c7a58434226f7a4e47c420cf39972b086ee3cd62b59ffe3',
    },
  });
};

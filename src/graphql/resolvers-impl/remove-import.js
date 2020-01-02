/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug')('crimemap-sync-api');
const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server');
const { Import } = require('../../database/models/import');

module.exports = async (_, { id }, context) => {
  const { user } = context;
  if (!user) {
    throw new AuthenticationError(
      'You are not authorized to access this service. You have to login first.'
    );
  }

  if (
    user.roles.indexOf('admin') === -1 &&
    user.permissions.indexOf('remove-import') === -1
  ) {
    throw new ForbiddenError(
      `The user '${user.name}' do not have permission to remove import.`
    );
  }

  debug(`removing import ${id}.`);

  const importDoc = await Import.findById(id).exec();
  if (!importDoc) {
    debug(`Import ${id} not found.`);
    throw new UserInputError(`Import '${id}' not found.`, {
      invalidArgs: ['id'],
    });
  }

  const removed = await importDoc.remove();
  debug(`import ${id} removed.`);

  return removed;
};

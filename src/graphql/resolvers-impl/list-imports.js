/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug')('crimemap-sync-api');
const { AuthenticationError } = require('apollo-server');
const { Import } = require('../../database/models/import');

module.exports = async (_, { top }, context) => {
  if (!context.user) {
    throw new AuthenticationError(
      'You are not authorized to access this service. You have to login first.'
    );
  }
  debug('querying imports');
  let importsQuery = Import.find().sort({ startDate: 'desc' });
  if (top !== 0) {
    importsQuery = importsQuery.limit(top);
  }
  const imports = await importsQuery.exec();
  debug(`found ${imports.length} imports records.`);
  return imports;
};

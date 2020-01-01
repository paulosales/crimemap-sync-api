/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug')('crimemap-sync-api');
const crypto = require('crypto');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { Import } = require('../../database/models/import');

module.exports = async (_, { pdfUrl }, context) => {
  if (!context.user) {
    throw new AuthenticationError(
      'You are not authorized to access this service. You have to login first.'
    );
  }
  debug('importing file...');

  const hash = crypto.createHmac('sha256', pdfUrl).digest('hex');
  debug('calculated file hash: %s', hash);

  const dbImported = await Import.findOne({ 'file.hash': hash }).exec();
  if (dbImported) {
    debug('The file %s is already imported with id %s.', pdfUrl, dbImported.id);
    throw new UserInputError(
      `The file ${pdfUrl} is already imported with the ID '${dbImported.id}'.`
    );
  }

  const imported = await Import.create({
    author: {
      username: 'paulosales',
      firstName: 'Paulo',
      lastName: 'Santos',
    },
    file: {
      name: 'teste.pdf',
      hash,
    },
  });
  debug("file imported with id '%s'.", imported.id);

  return imported;
};

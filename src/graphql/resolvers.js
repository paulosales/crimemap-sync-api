/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug')('crimemap-sync-api');
const crypto = require('crypto');
const { Import } = require('../database/models/import');

const resolvers = {
  Query: {
    listImports: async () => {
      debug('querying imports');
      const imports = await Import.find().exec();
      debug(`found ${imports.length} imports records.`);
      return imports;
    },
  },

  Mutation: {
    login: () => {
      return {
        id: 1,
        username: 'paulosales',
        email: 'paulosales@gmail.com',
        fullname: 'Paulo Rogério Sales Santos',
      };
    },

    logout: () => {
      return {
        id: 1,
        username: 'paulosales',
        email: 'paulosales@gmail.com',
        fullname: 'Paulo Rogério Sales Santos',
      };
    },

    import: async (_, { pdfFile }) => {
      debug('importing file...');

      const hash = crypto.createHmac('sha256', pdfFile).digest('hex');
      const imported = await Import.create({
        file: { name: 'teste.pdf', hash },
      });

      debug('file imported.');

      return imported;
    },

    removeImport: async (_, { id }) => {
      debug(`removing import ${id}.`);

      const importDoc = await Import.findById(id).exec();

      if (!importDoc) {
        throw new Error(`Import ${id} not found.`);
      }

      await importDoc.remove();

      debug(`import ${id} removed.`);

      return importDoc;
    },
  },
};

module.exports = resolvers;

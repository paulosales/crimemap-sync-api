/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug')('crimemap-sync-api');
const crypto = require('crypto');
const { Import } = require('../database/models/import');
const { User } = require('../database/models/user');

const resolvers = {
  Query: {
    listImports: async (_, { top }) => {
      debug('querying imports');
      let importsQuery = Import.find().sort({ startDate: 'desc' });
      if (top !== 0) {
        importsQuery = importsQuery.limit(top);
      }
      const imports = await importsQuery.exec();
      debug(`found ${imports.length} imports records.`);
      return imports;
    },

    info: async () => {
      debug('querying info');
      const packageJson = require('../../package.json');
      const infoData = {
        name: packageJson.name,
        version: packageJson.version,
        auth: packageJson.auth,
        license: packageJson.license,
        homepage: packageJson.homepage,
      };
      debug('info data sended');
      return infoData;
    },
  },

  Mutation: {
    login: async (_, { username, password }) => {
      debug(`${username} is loggin-in`);
      const auth = await User.login(username, password);
      debug(`${username} auth ${JSON.stringify(auth)}`);
      return auth;
    },

    import: async (_, { pdfUrl }) => {
      debug('importing file...');

      const hash = crypto.createHmac('sha256', pdfUrl).digest('hex');
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

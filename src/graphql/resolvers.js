/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { Import } = require('../database/models/import');

const resolvers = {
  Query: {
    listImports: async () => {
      return await Import.find().exec();
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

    import: async () => {
      return await Import.create({
        file: { name: 'teste.pdf', hash: 'e53453453fsdf45' },
      });
    },

    removeImport: () => {
      return {
        id: 1,
        startDate: new Date(),
        status: 'RUNNING',
        logs: [{ id: 1, date: new Date(), message: 'Processing pdf...' }],
      };
    },
  },
};

module.exports = resolvers;

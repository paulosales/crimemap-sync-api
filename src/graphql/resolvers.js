/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const listImports = require('./resolvers-impl/list-imports');
const info = require('./resolvers-impl/info');
const login = require('./resolvers-impl/login');
const importResolver = require('./resolvers-impl/import');
const removeImport = require('./resolvers-impl/remove-import');

const resolvers = {
  Query: {
    listImports,
    info,
  },

  Mutation: {
    login,
    import: importResolver,
    removeImport,
  },
};

module.exports = resolvers;

/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const { gql } = require('apollo-server');

const LIST_IMPORTS = gql`
  query QueryListImports {
    listImports {
      id
      status
      file {
        hash
      }
      logs {
        message
      }
    }
  }
`;

const INFO = gql`
  query {
    info {
      name
    }
  }
`;

module.exports = {
  LIST_IMPORTS,
  INFO,
};

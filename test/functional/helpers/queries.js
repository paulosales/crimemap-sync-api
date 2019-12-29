/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const { gql } = require('apollo-server');

const LIST_IMPORTS = gql`
  query QueryListImports($top: Int) {
    listImports(top: $top) {
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

const LIST_IMPORTS_IDS = gql`
  query QueryListImports {
    listImports {
      id
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
  LIST_IMPORTS_IDS,
  INFO,
};

/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const { gql } = require('apollo-server');

const IMPORT_FILE = gql`
  mutation($pdfUrl: String!) {
    import(pdfUrl: $pdfUrl) {
      status
    }
  }
`;

const IMPORT_FILE_WITH_ID = gql`
  mutation($pdfUrl: String!) {
    import(pdfUrl: $pdfUrl) {
      id
      status
    }
  }
`;

const REMOVE_IMPORT = gql`
  mutation($id: ID!) {
    removeImport(id: $id) {
      id
    }
  }
`;

const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      token
      message
    }
  }
`;

module.exports = {
  REMOVE_IMPORT,
  IMPORT_FILE,
  IMPORT_FILE_WITH_ID,
  LOGIN,
};

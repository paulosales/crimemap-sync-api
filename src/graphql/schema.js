/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  """
  Import status enum
  """
  enum ImportStatus {
    RUNNING
    SUCCESS
    FAIL
  }

  """
  Import log data type.
  """
  type ImportLog {
    "Log entry date time"
    date: Date!

    "Log message"
    message: String!
  }

  """
  File data
  """
  type ImportFile {
    "File name."
    name: String!

    "File hash digest."
    hash: String!
  }

  """
  Import data type.
  """
  type Import {
    "Import ID"
    id: ID!

    "Date and time that the import started."
    startDate: Date!

    "Date and time that the import finished."
    finishDate: Date

    "Import status. The domain values are: RUNNING, FAIL, SUCCESS"
    status: ImportStatus!

    "The imported file."
    file: ImportFile!

    "Logs list."
    logs: [ImportLog]!
  }

  """
  User data type
  """
  type User {
    "User name that can be used to login into sync server."
    username: String!

    "User email. It can be used to login into sync server."
    email: String!

    "User full name."
    fullname: String!
  }

  type Query {
    "List the imports performed into sync server."
    listImports(top: Int = 10, all: Boolean = false): [Import]!
  }

  type Mutation {
    "Log-in to sync server."
    login(username: String!, password: String!): User!

    "Log-out from sync server."
    logout(username: String!): User!

    "Runs a import into sync server."
    import(pdfFile: Upload!): Import!

    "Removes imported data from sync server."
    removeImport(id: ID!): Import!
  }
`;

module.exports = typeDefs;

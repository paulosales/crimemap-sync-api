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
  Author data type
  """
  type Author {
    username: String!
    firstName: String!
    lastName: String!
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

    "Import author"
    author: Author!

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

  """
  Auth data type. Used to return auth data at authentication methods.
  """
  type Auth {
    "It indicates the authentication operation was successfuly or not"
    success: Boolean!
    "Authentication operation message. If the authentication fails, this message will be set."
    message: String

    "The authorization token. If the authentication was succeed, this token will be set."
    token: String
  }

  type Query {
    "List the imports performed into sync server."
    listImports(top: Int = 10, all: Boolean = false): [Import]!
  }

  type Mutation {
    "Log-in to sync server."
    login(username: String!, password: String!): Auth!

    "Runs a import into sync server."
    import(pdfUrl: String!): Import!

    "Removes imported data from sync server."
    removeImport(id: ID!): Import!
  }
`;

module.exports = typeDefs;

/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const { createTestClient } = require('apollo-server-testing');
const server = require('../../../src/graphql/server');
const mutations = require('./mutations');

module.exports = async (username, password) => {
  // FIXME: Apollo server workaround.
  /*
   * This is a workaround for apollo server issue https://github.com/apollographql/apollo-server/issues/2277
   * The issue solution is schedulled in milestone 3.x: https://github.com/apollographql/apollo-server/milestone/16
   * When the definitive solution is realeased, the below line can be removed.
   */
  const integrationContext = {
    req: {
      headers: {
        authorization: '',
      },
    },
  };
  const originalContext = server.context;
  server.context = () => originalContext(integrationContext);

  const client = createTestClient(server);

  const resLogin = await client.mutate({
    mutation: mutations.LOGIN,
    variables: {
      username,
      password,
    },
  });

  server.context = originalContext;
  const { login } = resLogin.data;
  return login;
};

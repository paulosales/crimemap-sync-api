/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */

const { createTestClient } = require('apollo-server-testing');
const expect = require('chai').expect;
const server = require('../../src/graphql/server');
const queries = require('./helpers/queries');

describe('[functional] Info API', () => {
  let client;
  let originalContext;

  before(() => {
    // FIXME: Apollo server workaround.
    /*
     * This is a workaround for apollo server issue https://github.com/apollographql/apollo-server/issues/2277
     * The issue solution is schedulled in milestone 3.x: https://github.com/apollographql/apollo-server/milestone/16
     * When the definitive solution is realeased, the below line can be removed.
     */
    const integrationContext = {
      req: {
        headers: {
          authorization: ``,
        },
      },
    };
    originalContext = server.context;
    server.context = () => originalContext(integrationContext);
    client = createTestClient(server);
  });

  after(() => {
    server.context = originalContext;
  });

  context('call for api name', () => {
    it('should return the api name', async () => {
      const info = await client.query({
        query: queries.INFO,
      });

      const expected = { name: 'crimemap-sync-api' };
      expect(info.data.info).to.be.eql(expected);
    });
  });
});

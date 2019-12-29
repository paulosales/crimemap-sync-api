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

describe('#info service', () => {
  let client;

  before(() => {
    client = createTestClient(server);
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

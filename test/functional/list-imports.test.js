/* eslint-env node, mocha */
const { createTestClient } = require('apollo-server-testing');
const expect = require('chai').expect;
const server = require('../../src/graphql/server');
const queries = require('./helpers/queries');
const mutations = require('./helpers/mutations');
const setupTestData = require('./helpers/setupTestData');
const login = require('./helpers/login');

describe('[functional] List Imports API', () => {
  let client;
  let originalContext;

  context('with a authenticated user', () => {
    before(async () => {
      await setupTestData();
      originalContext = server.context;

      const authData = await login('johndoe', 'abc');

      // FIXME: Apollo server workaround.
      /*
       * This is a workaround for apollo server issue https://github.com/apollographql/apollo-server/issues/2277
       * The issue solution is schedulled in milestone 3.x: https://github.com/apollographql/apollo-server/milestone/16
       * When the definitive solution is realeased, the below line can be removed.
       */
      const integrationContext = {
        req: {
          headers: {
            authorization: `Bearer ${authData.token}`,
          },
        },
      };
      server.context = () => originalContext(integrationContext);

      client = createTestClient(server);
    });

    after(async () => {
      server.context = originalContext;
    });

    context('list imports with no parameters', () => {
      it('should return a list of imports', async () => {
        const res = await client.query({ query: queries.LIST_IMPORTS });
        const expected = {
          listImports: [
            {
              file: {
                hash:
                  'fdbec63e92aa80ce1c7a58434226f7a4e47c420cf39972b086ee3cd62b59ffe3',
              },
              logs: [],
              status: 'RUNNING',
            },
            {
              file: {
                hash:
                  'fdbec63e92aa80ce1c7a58434226f7a4e47c420cf39972b086ee3cd62b59ffef',
              },
              logs: [],
              status: 'SUCCESS',
            },
          ],
        };
        expect(res.data).to.eql(expected);
      });
    });

    context('list imports with top 1 option', () => {
      it('should return a list with one import', async () => {
        const res = await client.query({
          query: queries.LIST_IMPORTS,
          variables: {
            top: 1,
          },
        });
        const expected = {
          listImports: [
            {
              file: {
                hash:
                  'fdbec63e92aa80ce1c7a58434226f7a4e47c420cf39972b086ee3cd62b59ffe3',
              },
              logs: [],
              status: 'RUNNING',
            },
          ],
        };
        expect(res.data).to.eql(expected);
      });
    });
  });

  context('with no authenticated user', () => {
    before(() => {
      originalContext = server.context;

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
      server.context = () => originalContext(integrationContext);

      client = createTestClient(server);
    });

    after(() => {
      server.context = originalContext;
    });

    it('should throw a authentication error', async () => {
      const res = await client.query({
        query: queries.LIST_IMPORTS,
        variables: {
          top: 1,
        },
      });

      expect(res.errors).to.have.lengthOf(1);
      expect(res.errors[0].message).to.be.equals(
        'You are not authorized to access this service. You have to login first.'
      );
    });
  });
});

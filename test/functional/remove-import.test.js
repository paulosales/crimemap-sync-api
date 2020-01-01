/* eslint-env node, mocha */
const { createTestClient } = require('apollo-server-testing');
const expect = require('chai').expect;
const server = require('../../src/graphql/server');
const queries = require('./helpers/queries');
const mutations = require('./helpers/mutations');
const setupTestData = require('./helpers/setupTestData');
const login = require('./helpers/login');

describe('[functional] Remove Import API', () => {
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

    context('remove a existing import', () => {
      it('should remove a import successfuly', async () => {
        const res = await client.query({ query: queries.LIST_IMPORTS_IDS });
        const imports = res.data.listImports;

        for (let i = 0; i < imports.length; i++) {
          const importDoc = imports[i];
          const res = await client.mutate({
            mutation: mutations.REMOVE_IMPORT,
            variables: { id: importDoc.id },
          });

          const expected = { id: importDoc.id };
          expect(res.data.removeImport).to.eql(expected);
        }
      });
    });

    context('remove a noexistent import', () => {
      it('should not remove a import and fail', async () => {
        const res = await client.mutate({
          mutation: mutations.REMOVE_IMPORT,
          variables: { id: '6dd8540e077db37ca5839696' },
        });

        const expected = "Import '6dd8540e077db37ca5839696' not found.";
        expect(res.errors[0].message).to.be.equal(expected);
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
      const res = await client.mutate({
        mutation: mutations.REMOVE_IMPORT,
        variables: { id: '6dd8540e077db37ca5839696' },
      });

      expect(res.errors).to.have.lengthOf(1);
      expect(res.errors[0].message).to.be.equals(
        'You are not authorized to access this service. You have to login first.'
      );
    });
  });
});

/* eslint-env node, mocha */
const { createTestClient } = require('apollo-server-testing');
const expect = require('chai').expect;
const server = require('../../src/graphql/server');
const mutations = require('./helpers/mutations');
const setupTestData = require('./helpers/setupTestData');
const login = require('./helpers/login');

describe('[functional] Import API', () => {
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

    context('import a pdf file', () => {
      it('should upload a file successfully.', async () => {
        const pdfUrl = 'http://www.sources.com/file.pdf';
        const res = await client.mutate({
          mutation: mutations.IMPORT_FILE,
          variables: { pdfUrl: pdfUrl },
        });
        const expected = { import: { status: 'RUNNING' } };
        expect(res.data).to.eql(expected);
      });
    });

    context('import the same pdf twice', () => {
      it('should fail at the second upload.', async () => {
        const pdfUrl = 'http://www.sources.com/file1.pdf';
        const res1 = await client.mutate({
          mutation: mutations.IMPORT_FILE_WITH_ID,
          variables: { pdfUrl },
        });

        const res2 = await client.mutate({
          mutation: mutations.IMPORT_FILE,
          variables: { pdfUrl },
        });

        expect(res2.errors).not.to.be.undefined;
        expect(res2.errors).have.lengthOf(1);
        expect(res2.errors[0].message).to.be.equals(
          `The file http://www.sources.com/file1.pdf is already imported with the ID '${res1.data.import.id}'.`
        );
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
      const pdfUrl = 'http://www.sources.com/file.pdf';
      const res = await client.mutate({
        mutation: mutations.IMPORT_FILE,
        variables: { pdfUrl: pdfUrl },
      });

      expect(res.errors).to.have.lengthOf(1);
      expect(res.errors[0].message).to.be.equals(
        'You are not authorized to access this service. You have to login first.'
      );
    });
  });

  context('with a authenticated user and no permissions', () => {
    before(async () => {
      await setupTestData();
      originalContext = server.context;

      const authData = await login('foobar', 'abc');

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

    it('should fail to import', async () => {
      const pdfUrl = 'http://www.sources.com/file.pdf';
      const res = await client.mutate({
        mutation: mutations.IMPORT_FILE,
        variables: { pdfUrl: pdfUrl },
      });

      expect(res.errors).to.have.lengthOf(1);
      expect(res.errors[0].message).to.be.equals(
        "The user 'foo bar' do not have permission to import."
      );
    });
  });
});

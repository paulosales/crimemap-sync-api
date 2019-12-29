/* eslint-env node, mocha */
const { createTestClient } = require('apollo-server-testing');
const expect = require('chai').expect;
const server = require('../src/graphql/server');
const queries = require('./helpers/queries');
const mutations = require('./helpers/mutations');
const setupTestData = require('./helpers/setupTestData');

describe('CrimeSync GraphQL Import API', () => {
  let client;

  before(async () => {
    client = createTestClient(server);
    await setupTestData();
  });

  context('list imports with no parameters', () => {
    it('should return a list of imports', async () => {
      const res = await client.query({ query: queries.LIST_IMPORTS });
      const expected = {
        listImports: [],
      };
      expect(res.data).to.eql(expected);
    });
  });

  context('upload a pdf file', () => {
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

  context('remove a existing import', () => {
    it('should remove a import successfuly', async () => {
      const res = await client.query({ query: queries.LIST_IMPORTS });
      const imports = res.data.listImports;

      for (let i = 0; i < imports.length; i++) {
        const importDoc = imports[i];
        const res = await client.mutate({
          mutation: mutations.REMOVE_IMPORT,
          variables: { id: importDoc.id },
        });

        const expected = { removeImport: { status: 'RUNNING' } };
        expect(res.data).to.eql(expected);
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

/* eslint-env node, mocha */
const { createTestClient } = require('apollo-server-testing');
const expect = require('chai').expect;
const server = require('../src/graphql/server');
const queries = require('./queries');
const mutations = require('./mutations');

describe('CrimeSync GraphQL API', () => {
  let client;

  before(() => {
    client = createTestClient(server);
  });

  it('should return a list of imports', async () => {
    const res = await client.query({ query: queries.LIST_IMPORTS });
    const expected = {
      listImports: [],
    };
    expect(res.data).to.eql(expected);
  });

  it('should upload a file successfully.', async () => {
    const pdfUrl = 'http://www.sources.com/file.pdf';
    const res = await client.mutate({
      mutation: mutations.IMPORT_FILE,
      variables: { pdfUrl: pdfUrl },
    });
    const expected = { import: { status: 'RUNNING' } };
    expect(res.data).to.eql(expected);
  });

  it('should remove a import', async () => {
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

  it('should login successfully', async () => {
    const res = await client.mutate({
      mutation: mutations.LOGIN,
      variables: {
        username: 'paulosales',
        password: 'abc',
      },
    });

    expect(res.data.login.success).to.be.true;
    expect(res.data.login.message).to.be.null;
    expect(res.data.login.token).to.be.not.null;
  });

  it('should login fail', async () => {
    const res = await client.mutate({
      mutation: mutations.LOGIN,
      variables: {
        username: 'paulosales',
        password: 'wrong',
      },
    });

    expect(res.data.login.success).to.be.false;
    expect(res.data.login.message).to.be.equal(
      'Username or password is invalid!'
    );
    expect(res.data.login.token).to.be.null;
  });
});

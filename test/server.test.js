/* eslint-env node, mocha */
const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const expect = require('chai').expect;
const server = require('../src/graphql/server');
const db = require('../src/database/db');

describe('GraphQL API', () => {
  let client;
  const LIST_IMPORTS = gql`
    query QueryListImports {
      listImports {
        id
        status
        file {
          hash
        }
        logs {
          message
        }
      }
    }
  `;

  const UPLOAD_FILE = gql`
    mutation($pdfFile: Upload!) {
      import(pdfFile: $pdfFile) {
        status
      }
    }
  `;

  const REMOVE_IMPORT = gql`
    mutation($id: ID!) {
      removeImport(id: $id) {
        status
      }
    }
  `;

  before(() => {
    client = createTestClient(server);
  });

  it('should return a list of imports', async () => {
    const res = await client.query({ query: LIST_IMPORTS });
    const expected = {
      listImports: [],
    };
    expect(res.data).to.eql(expected);
  });

  it('should upload a file successfully.', async () => {
    const pdfFile = new Buffer.from(['Test']);
    const res = await client.mutate({
      mutation: UPLOAD_FILE,
      variables: { pdfFile },
    });
    const expected = { import: { status: 'RUNNING' } };
    expect(res.data).to.eql(expected);
  });

  it('should remove a import', async () => {
    const res = await client.query({ query: LIST_IMPORTS });
    const imports = res.data.listImports;

    for (let i = 0; i < imports.length; i++) {
      const importDoc = imports[i];
      const res = await client.mutate({
        mutation: REMOVE_IMPORT,
        variables: { id: importDoc.id },
      });

      const expected = { removeImport: { status: 'RUNNING' } };
      expect(res.data).to.eql(expected);
    }
  });
});

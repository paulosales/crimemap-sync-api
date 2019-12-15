/* eslint-env node, mocha */
const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const expect = require('chai').expect;
const server = require('../src/graphql/server');

describe('GraphQL API', () => {

  let client;
  let LIST_IMPORTS;

  before(() => {
    client = createTestClient(server);
    LIST_IMPORTS = gql`
      query QueryListImports {
        listImports {
          id
          status
          logs {
            id
            message
          }
        }
      }
    `;
  });


  it('should return a list of imports', async () => {
    const res = await client.query({query: LIST_IMPORTS});
    const expected = {
      listImports: [
        {
          id: "1", status: "RUNNING",
          logs: [
            { id: "1", message: "Downloading pdf..." }
          ]
        }
      ]
    };
    expect(res.data).to.eql(expected);
  });
});

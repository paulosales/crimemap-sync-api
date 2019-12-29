/* eslint-env node, mocha */
const { createTestClient } = require('apollo-server-testing');
const expect = require('chai').expect;
const server = require('../../src/graphql/server');
const mutations = require('./helpers/mutations');
const setupTestData = require('./helpers/setupTestData');

describe('CrimeSync User GraphQL API', () => {
  let client;

  before(async () => {
    client = createTestClient(server);
    await setupTestData();
  });

  context('login with a valid username and password', () => {
    it('should login successfully', async () => {
      const res = await client.mutate({
        mutation: mutations.LOGIN,
        variables: {
          username: 'johndoe',
          password: 'abc',
        },
      });

      expect(res.data.login.success).to.be.true;
      expect(res.data.login.message).to.be.null;
      expect(res.data.login.token).to.be.not.null;
    });
  });

  context('login with a invalid username', () => {
    it('should fail', async () => {
      const res = await client.mutate({
        mutation: mutations.LOGIN,
        variables: {
          username: 'invaliduser',
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

  context('login with a invalid password', () => {
    it('should fail', async () => {
      const res = await client.mutate({
        mutation: mutations.LOGIN,
        variables: {
          username: 'johndoe',
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
});

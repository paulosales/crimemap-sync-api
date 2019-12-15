const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const DEV_MODE = process.env.NODE_ENV === "development";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: "/subscriptions"
  },
  cors: {
    origin: process.env.CORS_CLIENT_ORIGIN || '*',
    methods: ['OPTIONS','POST'],
    credentials: true
  },
  playground: DEV_MODE,
  debug: DEV_MODE
});

module.exports = server;

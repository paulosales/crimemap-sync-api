const imports = [
  {
    id: 1, startDate: new Date(), status: "RUNNING", logs: [
      {id: 1, date: new Date(), message: "Downloading pdf..."}
    ]
  }
];

const resolvers = {
  Query: {
    listImports: () => {
      return imports;
    }
  },

  Mutation: {
    login: () => {
      return {
        id: 1, username: "paulosales",
        email: "paulosales@gmail.com",
        fullname: "Paulo Rogério Sales Santos"
      }
    },

    logout: () => {
      return {
        id: 1, username: "paulosales",
        email: "paulosales@gmail.com",
        fullname: "Paulo Rogério Sales Santos"
      }
    },

    import: () => {
      return {
        id: 1,
        startDate: new Date(),
        status: "RUNNING",
        logs: [
          {id: 1, date: new Date(), message: "Processing pdf..."}
        ]
      }
    },

    removeImport: () => {
      return {
        id: 1,
        startDate: new Date(),
        status: "RUNNING",
        logs: [
          {id: 1, date: new Date(), message: "Processing pdf..."}
        ]
      }
    }
  }
}

module.exports = resolvers;

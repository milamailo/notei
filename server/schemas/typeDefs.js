const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String
    lastname: String
    username: String
    email: String
    password: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
  }
  type Mutation {
    addUser(
      firstname: String!
      lastname: String
      email: String!
      password: String!
    ): Auth
  }
`;

module.exports = typeDefs;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String
    lastname: String
    username: String
    email: String
    password: String
    notes: [Note]
    createdAt: Date
  }
  type Note {
    _id: ID
    title: String
    text: String
    summery: String
    audioFile: String
    createdAt: Date
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    userByEmailOrUserName(username: String, email: String): User
  }
  type Mutation {
    addUser(
      firstname: String!
      lastname: String
      email: String!
      username: String
      password: String!
    ): Auth
    updateUser(
      firstname: String
      lastname: String
      username: String
      email: String
      password: String
    ): User
    login(email: String, username: String, password: String): Auth
  }
`;

module.exports = typeDefs;

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
    createdAt: String
  }
  type Note {
    _id: ID
    title: String
    text: String
    summery: String
    audioFile: String
    subNotes: [SubNote]
    createdAt: String
  }
  type SubNote {
    _id: ID
    title: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    # User
    users: [User]
    userByEmailOrUserName(username: String, email: String): User
    authUser: User
    # Note
    notes(username: String, email: String): [Note]
    note(noteId: ID!): Note
    # Transcript
    analyzer(transcript: String): Note
  }
  type Mutation {
    # User
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
      note: String
    ): User
    login(email: String, username: String, password: String): Auth

    # Note
    addNote(
      title: String
      text: String
      summery: String
      audioFile: String
      token: String
    ): Note
  }
`;

module.exports = typeDefs;

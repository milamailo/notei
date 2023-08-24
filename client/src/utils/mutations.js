import { gql } from "@apollo/client";

export const MUTATION_LOGIN_USER = gql`
  mutation Mutation($password: String, $username: String, $email: String) {
    login(password: $password, username: $username, email: $email) {
      token
      user {
        _id
        firstname
        lastname
        username
        email
        password
        notes {
          _id
          title
          text
          summery
          audioFile
          subNotes {
            _id
            title
            createdAt
          }
          createdAt
        }
        createdAt
      }
    }
  }
`;

export const MUTATION_ADD_USER = gql`
  mutation addUser(
    $firstname: String!
    $lastname: String
    $email: String!
    $password: String!
    $username: String
  ) {
    addUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      username: $username
    ) {
      token
      user {
        _id
        username
        email
        createdAt
      }
    }
  }
`;

export const MUTATION_ADD_NOTE = gql`
  mutation Mutation(
    $title: String
    $text: String
    $summery: String
    $audioFile: String
    $token: String
  ) {
    addNote(
      title: $title
      text: $text
      summery: $summery
      audioFile: $audioFile
      token: $token
    ) {
      _id
      title
      text
      summery
      createdAt
    }
  }
`;

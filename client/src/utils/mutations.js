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

import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query Users {
    users {
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
        createdAt
        subNotes {
          _id
          title
          createdAt
        }
      }
      createdAt
    }
  }
`;

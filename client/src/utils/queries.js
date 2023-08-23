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
export const QUERY_USER = gql`
  query UserByEmailOrUserName($username: String, $email: String) {
    userByEmailOrUserName(username: $username, email: $email) {
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
export const QUERY_ME = gql`
  query AuthUser {
    authUser {
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
`;
export const QUERY_ANALYZE = gql`
  query Analyzer($transcript: String!) {
    analyzer(transcript: $transcript) {
      _id
      title
      text
      summery
      createdAt
    }
  }
`;

import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import Auth from "../utils/auth";
import Intro from "../components/Intro";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const users = data?.users || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {!Auth.loggedIn() ? (
            <Intro />
          ) : loading ? (
            <h1>loading ...</h1>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  <p>User: {user.username}</p>
                  <ul>
                    {user.notes.map((note) => (
                      <li key={note._id}>
                        <p>User: {note.title}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

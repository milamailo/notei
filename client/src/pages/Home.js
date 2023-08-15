import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import Auth from "../utils/auth";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const users = data?.users || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {Auth.loggedIn() ? (
                users.map((user) => (
                  <li key={user._id}>
                    <p>
                      User: {user.firstname} {user.email}
                    </p>
                  </li>
                ))
              ) : (
                <h1>Empty</h1>
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

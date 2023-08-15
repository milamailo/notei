import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";

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
              {users.map((user) => (
                <li key={user._id}>
                  <p>
                    User: {user.firstname} {user.email}
                  </p>
                  {/* Render other user information here */}
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

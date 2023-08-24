import React from "react";
import { QUERY_ALL_USERS } from "../utils/queries";
import Auth from "../utils/auth";
import Intro from "../components/Intro";
import "./css/Home.css";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { Navigate, useParams, Link } from "react-router-dom";
import News from "../components/News";

const Home = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.authUser || data?.userByEmailOrUserName || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/authUser" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  const sortedNotes = user.notes.slice().sort((a, b) => {
    const timeDiffA = Math.abs(
      new Date().getTime() - new Date(a.createdAt).getTime()
    );
    const timeDiffB = Math.abs(
      new Date().getTime() - new Date(b.createdAt).getTime()
    );

    return timeDiffA - timeDiffB;
  });

  const reversedNotes = sortedNotes.reverse().slice(0, 6);
  console.log(reversedNotes);

  return (
    <main>
      <div className="main-content">
        <div className="col-12 col-md-12 mb-3">
          {!Auth.loggedIn() ? (
            <Intro />
          ) : loading ? (
            <h1>loading ...</h1>
          ) : (
            <div className="cantainer-root">
              <div className="container-child">
                <div className="card mb-3">
                  <h4 className="card-header bg-primary text-light p-2 m-0">
                    Setting
                  </h4>
                  <div className="card-body bg-light p-2 aling-card ">
                    <button className="btn btn-lg btn-info m-2 w-100">
                      Edit Profile
                    </button>
                  </div>
                  <div className="card-body bg-light p-2 aling-card ">
                    <button className="btn btn-lg btn-info m-2 w-100">
                      Change Password
                    </button>
                  </div>
                </div>
                <div className="card mb-3">
                  <h4 className="card-header bg-primary text-light p-2 m-0">
                    Reports
                  </h4>
                  <div className="card-body bg-light p-2 aling-card ">
                    <button className="btn btn-lg btn-info m-2 w-100">
                      Total notes
                    </button>
                  </div>
                  <div className="card-body bg-light p-2 aling-card ">
                    <button className="btn btn-lg btn-info m-2 w-100">
                      last 7 days
                    </button>
                  </div>
                </div>
                <div className="card mb-3">
                  <h4 className="card-header bg-primary text-light p-2 m-0">
                    Content
                  </h4>
                  <div className="card-body bg-light p-2 aling-card ">
                    <button className="btn btn-lg btn-info m-2 w-100">
                      Contents
                    </button>
                  </div>
                  <div className="card-body bg-light p-2 aling-card ">
                    <button className="btn btn-lg btn-info m-2 w-100">
                      Send a Note
                    </button>
                  </div>
                </div>
              </div>
              <div className="container-child-middle">
                <div className="card mb-3">
                  <h4 className="card-header bg-primary text-light p-2 m-0">
                    Recent
                  </h4>
                  <div className="card-body bg-light p-2 aling-card ">
                    {reversedNotes.length ? (
                      reversedNotes.map((note) => (
                        <div key={note._id} className="card mb-3">
                          <h4 className="card-header bg-primary text-light p-2 m-0">
                            {user.username ? (
                              <Link
                                className="text-light"
                                to={`/profiles/${note}`}
                              >
                                <span style={{ fontSize: "1rem" }}>
                                  {note.title} {note.createdAt}
                                </span>
                              </Link>
                            ) : (
                              <>
                                <span style={{ fontSize: "1rem" }}>
                                  {note.title} {note.createdAt}
                                </span>
                              </>
                            )}
                          </h4>
                          <div className="card-body bg-light p-2">
                            <p>{note.text}</p>
                          </div>
                          <Link
                            className="btn btn-primary btn-block btn-squared"
                            to={`/notes/${note._id}`}
                          >
                            add Subnote to this note.
                          </Link>
                        </div>
                      ))
                    ) : (
                      <h5>No Note Yet</h5>
                    )}
                  </div>
                </div>
              </div>
              <div className="container-child">
                <div className="card mb-3">
                  <h4 className="card-header bg-primary text-light p-2 m-0">
                    News
                  </h4>
                  <News />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

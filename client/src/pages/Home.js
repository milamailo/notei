import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import Auth from "../utils/auth";
import Intro from "../components/Intro";
import "./css/Home.css";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const users = data?.users || [];

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
                    <button className="btn btn-lg btn-info m-2 w-100">
                      News1
                    </button>
                  </div>
                  <div className="card-body bg-light p-2 aling-card ">
                    <button className="btn btn-lg btn-info m-2 w-100">
                      News2
                    </button>
                  </div>
                </div>
              </div>
              <div className="container-child">
                <div className="card mb-3">
                  <h4 className="card-header bg-primary text-light p-2 m-0">
                    News
                  </h4>
                  <div className="card-body bg-light p-2 aling-card ">
                    <button className="btn btn-lg btn-info m-2 w-100">
                      News1
                    </button>
                  </div>
                  <div className="card-body bg-light p-2 aling-card ">
                    <button className="btn btn-lg btn-info m-2 w-100">
                      News2
                    </button>
                  </div>
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

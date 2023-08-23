import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import NoteList from "../components/NoteList";
import Dictaphone from "../components/Dictaphone";
import "./css/Profile.css";

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const [showAddNote, setShowAddNote] = useState(false);
  const btnBack = () => {
    setShowAddNote(false);
  };
  const user = data?.authUser || data?.userByEmailOrUserName || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
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

  return (
    <div>
      <div className="profile-root mb-3">
        <div className="col-12 col-md-10 bg-primary text-light p-3 mb-5 note-list-header">
          <h3>Viewing {userParam ? `${user.username}'s` : "your"} profile.</h3>
          <button
            onClick={() => {
              setShowAddNote(true);
            }}
            className="btn btn-lg btn-info m-2"
          >
            +note
          </button>
        </div>
        <div className="col-12 col-md-10 mb-5">
          <NoteList
            notes={user.notes}
            title={`${user.username}'s notes...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            // className="col-12 col-md-10 mb-3 p-3"
            className="col-md-9 mb-3 p-3"
            // style={{ border: "1px dotted #1a1a1a" }}
          >
            {/* <Dictaphone /> */}
          </div>
        )}
      </div>
      {showAddNote && (
        <Dictaphone
          user={user}
          btnBack={btnBack}
          setShowAddNote={setShowAddNote}
        />
      )}
    </div>
  );
};

export default Profile;

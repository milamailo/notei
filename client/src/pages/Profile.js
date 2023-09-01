import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import NoteList from "../components/NoteList";
import Dictaphone from "../components/Dictaphone";
import "./css/Profile.css";
import { MUTATION_ADD_NOTE } from "../utils/mutations";

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // Assuming you have a mutation to add a note
  const [addNote] = useMutation(MUTATION_ADD_NOTE);

  const [showAddNote, setShowAddNote] = useState(false);

  const btnBack = () => {
    setShowAddNote(false);
  };

  const user = data?.authUser || data?.userByEmailOrUserName || {};

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

  const handleAddNote = async (noteData) => {
    try {
      // Call the mutation function to add a note
      await addNote({
        variables: noteData,
        refetchQueries: [
          { query: QUERY_USER, variables: { username: userParam } },
        ],
      });

      // After adding a note, the Apollo Client cache will be automatically updated
      // and the note list will be refreshed

      setShowAddNote(false);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  return (
    <div>
      <div className="profile-root mb-3">
        <div className="col-12 col-md-10 bg-primary text-light p-3 mb-5 note-list-header">
          <h3>Viewing All Notes.</h3>
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
          handleAddNote={handleAddNote}
        />
      )}
    </div>
  );
};

export default Profile;

import React from "react";
import { Link } from "react-router-dom";

const NoteList = ({ notes, title, showTitle = true, showUsername = true }) => {
  // Sort notes by the absolute difference between createdAt and current time
  const sortedNotes = notes.slice().sort((a, b) => {
    const timeDiffA = Math.abs(new Date().getTime() - new Date(a.createdAt).getTime());
    const timeDiffB = Math.abs(new Date().getTime() - new Date(b.createdAt).getTime());

    return timeDiffA - timeDiffB;
  });

  // Reverse the order to display the closest time on top
  const reversedNotes = sortedNotes.reverse();

  if (!reversedNotes.length) {
    return <h3>No Note Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {reversedNotes.map((note) => (
        <div key={note._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {showUsername ? (
              <Link className="text-light" to={`/profiles/${note}`}>
                {note.title} <br />
                <span style={{ fontSize: "1rem" }}>
                  had this note on {note.createdAt}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: "1rem" }}>
                  You had this note on {note.createdAt}
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
      ))}
    </div>
  );
};

export default NoteList;

import React from "react";
import "./Sidebar.css";

function Sidebar({
  notes,
  onAddNote,
  handleDelete,
  activeNote,
  setActiveNote,
}) {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-notes">
        <button onClick={onAddNote} className="btnadd">
          Add
        </button>

        {sortedNotes.map((note) => (
          <div
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
            <p>{note.body && note.body.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(note.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

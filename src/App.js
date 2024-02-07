import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Header from "./layout/Header";
import "./App.css";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const [activeNote, setActiveNote] = useState(false);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const onUpdateNote = (updatedNotes) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNotes;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  const handleDelete = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <Header />
      <div className="App">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          handleDelete={handleDelete}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";

const Notes = ({ notes, addNote, deleteNote, editNote }) => {
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const handleAddNote = () => {
    const timestamp = "00 min 00 sec"; // Example timestamp, replace with actual logic
    addNote({
      timestamp,
      content: newNote,
      id: Date.now(),
    });
    setNewNote("");
  };

  const handleEditNote = (id) => {
    editNote(id, editingContent);
    setEditingId(null);
    setEditingContent("");
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Add a new note"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add note
        </button>
      </div>
      <div>
        {notes.map((note) => (
          <div key={note.id} className="mb-4 p-4 border rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-500">{note.timestamp}</span>
              <div>
                <button
                  onClick={() => {
                    setEditingId(note.id);
                    setEditingContent(note.content);
                  }}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
            {editingId === note.id ? (
              <div>
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="border p-2 w-full mb-2"
                />
                <button
                  onClick={() => handleEditNote(note.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <p>{note.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;

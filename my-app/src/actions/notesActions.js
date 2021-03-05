const addNote = note => {
  return {
    type: "ADD_NOTE",
    payload: note
  };
};

const deleteNote = noteId => {
  return {
    type: "DELETE_NOTE",
    payload: noteId
  };
};

const updateNote = (noteId, updation) => {
  return {
    type: "UPDATE_NOTE",
    payload: {
      id: noteId,
      updation: updation
    }
  };
};

export default { addNote, deleteNote, updateNote };

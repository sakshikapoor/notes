const notesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NOTE":
      const newArray = state.concat(action.payload);
      return newArray;

    case "DELETE_NOTE":
      return state.filter(note => note.id !== action.payload);

    case "UPDATE_NOTE":
      return state;

    default:
      return state;
  }
};

export default notesReducer;

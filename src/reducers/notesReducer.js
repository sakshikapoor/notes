// (state, action) => newState
const notesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NOTE":
      const newArray = state.concat(action.payload);
      return newArray;

    case "DELETE_NOTE":
      return state.filter(note => note.id !== action.payload);

    case "UPDATE_NOTE":
      const newState = state.map(note => {
        const update = action.payload.updation;
        if (note.id === action.payload.id) {
          return { ...note, content: update.content, type: update.type };
        }
        return { ...note };
      });

      return newState;

    default:
      return state;
  }
};

export default notesReducer;

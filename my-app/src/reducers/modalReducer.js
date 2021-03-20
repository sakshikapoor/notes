const initialModalState = {
  isOpen: false,
  noteData: null
};

const modalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      const openState = {
        isOpen: true,
        noteData: action.payload
      };
      return openState;

    case "CLOSE_MODAL":
      const closeState = { isOpen: false, noteData: null };
      return closeState;

    case "UPDATE_MODAL_CONTENT":
      const updated = {
        ...state, noteData: { ...state.noteData, content: { heading: action.payload.heading, description: action.payload.description } }
      }

      return updated;

    default:
      return state;
  }
};

export default modalReducer;

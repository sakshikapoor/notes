const initialModalState = {
  isOpen: false,
  noteData: null
};

const modalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      const openState = {
        ...state,
        isOpen: true,
        noteData: action.payload.note,
        isNew: action.payload.isNew
      };
      return openState;

    case "CLOSE_MODAL":
      const closeState = { ...state, isOpen: false, noteData: null, isNew: false };
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

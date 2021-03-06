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
      const closeState = { isOpen: false, noteData: state };
      return closeState;

    default:
      return state;
  }
};

export default modalReducer;

const openModal = (selectedNote = null) => {
  return {
    type: "OPEN_MODAL",
    payload: selectedNote
  };
};

const closeModal = () => {
  return {
    type: "CLOSE_MODAL"
  };
};

const updateModalContent = (noteData = { heading: "", description: "" }) => {
  return {
    type: "UPDATE_MODAL_CONTENT",
    payload: noteData
  };
};

export default { openModal, closeModal, updateModalContent };

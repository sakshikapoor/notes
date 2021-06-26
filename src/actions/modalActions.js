const openModal = (selectedNote = null, isNew) => {
  return {
    type: "OPEN_MODAL",
    payload: { note: selectedNote, isNew: isNew }
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

const actions = { openModal, closeModal, updateModalContent };
export default actions
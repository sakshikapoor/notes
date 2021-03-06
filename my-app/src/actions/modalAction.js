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

export default { openModal, closeModal };

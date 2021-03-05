import { useSelector } from "react-redux";
import React, { useState } from "react";
import "./NotesContainer.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import noteActions from "../../actions/notesActions";
import Notes from "./NoteList";

const NotesContainer = () => {
  Modal.setAppElement("#root");
  const selectedTab = useSelector(state => state.selectedTab);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [noteContent, updateNote] = useState("");
  const notes = useSelector(state => state.notes);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const dispatch = useDispatch();
  const saveNote = () => {
    const note = {
      content: noteContent,
      type: "notes",
      date: new Date(),
      id: Math.floor(Math.random() * 1000000)
    };
    dispatch(noteActions.addNote(note));
    closeModal();
  };
  const handleChange = event => {
    updateNote(event.target.value);
  };

  return (
    <div className="full-width">
      <button className="note-create" onClick={openModal}>
        Create a note
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="close" onClick={closeModal}>
          X
        </div>
        <textarea
          className="notes-textarea"
          placeholder="Write a note.."
          onChange={handleChange}
        />
        <div className="notes-action">
          <button className="notes-action-btn save" onClick={() => saveNote()}>
            SAVE
          </button>
          <button className="notes-action-btn discard" onClick={closeModal}>
            DISCARD
          </button>
        </div>
      </Modal>
      <Notes />
    </div>
  );
};

export default NotesContainer;

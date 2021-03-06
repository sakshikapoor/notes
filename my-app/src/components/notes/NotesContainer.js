import { useSelector } from "react-redux";
import React, { useState } from "react";
import "./NotesContainer.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import noteActions from "../../actions/notesActions";
import Notes from "./NoteList";
import modalActions from "../../actions/modalAction";
import NoteCategory from "../../NoteCategory";

const NotesContainer = () => {
  Modal.setAppElement("#root");
  const [noteContent, updateNoteContent] = useState("");
  const dispatch = useDispatch();
  const isTrash =
    useSelector(state => state.selectedTab) === "trash" ? true : false;

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
    dispatch(modalActions.openModal());
  };

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };

  const modal = useSelector(state => state.modal);
  const modalIsOpen = modal.isOpen;
  const isNewNote = modal.noteData === null;
  let modalContent;
  let modalId;
  if (!isNewNote) {
    modalContent = modal.noteData.content;
    modalId = modal.noteData.id;
  }

  const getDate = () => {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return `${dd}/${mm}/${yyyy}`;
  };

  const saveNote = () => {
    const date = getDate();
    const note = {
      content: noteContent,
      type: NoteCategory.others,
      date: date,
      id: Math.floor(Math.random() * 1000000)
    };
    dispatch(noteActions.addNote(note));
    closeModal();
  };

  const handleChange = event => {
    updateNoteContent(event.target.value);
  };

  const updateNote = () => {
    const note = {
      content: noteContent,
      type: isNewNote ? "notes" : modal.noteData.type
    };
    dispatch(noteActions.updateNote(modalId, note));
    closeModal();
  };

  const deleteNote = () => {
    const note = {
      content: noteContent,
      type: "trash"
    };
    dispatch(noteActions.updateNote(modalId, note));
    closeModal();
  };

  const deleteNotePermanently = () => {
    dispatch(noteActions.deleteNote(modalId));
    closeModal();
  };

  let saveOrUpdateButton = null;
  if (isNewNote) {
    saveOrUpdateButton = (
      <button className="notes-action-btn save" onClick={() => saveNote()}>
        SAVE
      </button>
    );
  } else if (!isTrash) {
    saveOrUpdateButton = (
      <button className="notes-action-btn save" onClick={() => updateNote()}>
        UPDATE
      </button>
    );
  }
  let trashOrDeleteButton = null;
  if (isTrash) {
    trashOrDeleteButton = (
      <button
        className="notes-action-btn trash"
        onClick={deleteNotePermanently}
      >
        DELETE PERMANENTLY
      </button>
    );
  } else {
    trashOrDeleteButton = (
      <button className="notes-action-btn trash" onClick={deleteNote}>
        TRASH
      </button>
    );
  }

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
          &#10005;
        </div>
        <textarea
          className="notes-textarea"
          placeholder="Write a note.."
          onChange={handleChange}
          defaultValue={modalContent}
          readOnly={isTrash}
        />
        <div className="notes-action">
          {saveOrUpdateButton}
          {trashOrDeleteButton}
        </div>
      </Modal>
      <Notes />
    </div>
  );
};

export default NotesContainer;

import React, { useState } from "react";
import "./NotesContainer.css";
import { useDispatch, useSelector } from "react-redux";
import noteActions from "../../actions/notesActions";
import NoteList from "./NoteList";
import modalActions from "../../actions/modalAction";
import NoteCategory from "../../NoteCategory";
import { getDate } from "../../utils";

const EmptyNoteContent = {
  heading: "",
  description: ""
};

const NotesContainer = () => {
  const dispatch = useDispatch();
  const isTrash =
    useSelector(state => state.selectedTab) === "trash" ? true : false;
  const theme = useSelector(state => state.theme);
  const openModal = () => {
    dispatch(modalActions.openModal());
  };

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };

  const modal = useSelector(state => state.modal);
  const modalIsOpen = modal.isOpen;
  const isNewNote = modal.noteData === null;

  const saveNote = () => {
    const note = {
      content: modal.noteData,
      type: NoteCategory.others,
      date: getDate(),
      id: Math.floor(Math.random() * 1000000)
    };
    dispatch(noteActions.addNote(note));
    closeModal();
  };

  const handleChange = (event, type) => {
    const updatedNote = { ...modal.noteData.content };
    if (type === "heading") {
      updatedNote.heading = event.target.value;
    } else if (type === "description") {
      updatedNote.description = event.target.value;
    }
    dispatch(modalActions.updateModalContent(updatedNote));
  };

  const updateNote = () => {
    const note = {
      content: modal.noteData.content,
      type: isNewNote ? "notes" : modal.noteData.type
    };
    dispatch(noteActions.updateNote(modal.noteData.id, note));
    closeModal();
  };

  const deleteNote = () => {
    const note = {
      content: modal.noteData,
      type: "trash"
    };
    dispatch(noteActions.updateNote(modal.noteData.id, note));
    closeModal();
  };

  const deleteNotePermanently = () => {
    dispatch(noteActions.deleteNote(modal.noteData.id));
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
  if (isTrash && !isNewNote) {
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

  const noteContent = modal.noteData ? modal.noteData.content : EmptyNoteContent

  return (
    <div className="full-width">
      <button className="note-create" onClick={openModal}>
      </button>
      <div data-theme={theme} className={"modal-container " + (modalIsOpen ? "show-modal" : "hide-modal")} >
        <div className="close" onClick={closeModal}>
          &#10005;
          </div>
        <div className="notes-container">
          <input
            className="notes-heading"
            type="text"
            placeholder="Heading"
            onChange={e => handleChange(e, "heading")}
            value={noteContent.heading}
            readOnly={isTrash && !isNewNote}
          />
          <textarea
            className="notes-textarea"
            placeholder="Write a note.."
            value={noteContent.description}
            onChange={e => handleChange(e, "description")}
            readOnly={isTrash && !isNewNote}
          />
        </div>
        <div className="notes-action">
          {saveOrUpdateButton}
          {trashOrDeleteButton}
        </div>
      </div>
      <NoteList />
    </div>
  );
};

export default NotesContainer;

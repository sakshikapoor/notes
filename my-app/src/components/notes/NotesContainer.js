import React, { useState } from "react";
import "./NotesContainer.css";
import { useDispatch, useSelector } from "react-redux";
import noteActions from "../../actions/notesActions";
import NoteList from "./NoteList";
import modalActions from "../../actions/modalAction";
import NoteCategory from "../../NoteCategory";
import { getDate } from "../../utils";

const NoteContent = {
  heading: "",
  description: ""
};

const NotesContainer = () => {
  const [noteContent, updateNoteContent] = useState(NoteContent);
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
  let heading, description;
  const isNewNote = modal.noteData === null;
  let modalId;
  if (!isNewNote) {
    heading = modal.noteData.content.heading;
    description = modal.noteData.content.description;
    modalId = modal.noteData.id;
  }

  const saveNote = () => {
    const note = {
      content: noteContent,
      type: NoteCategory.others,
      date: getDate(),
      id: Math.floor(Math.random() * 1000000)
    };
    dispatch(noteActions.addNote(note));
    closeModal();
  };

  const handleChange = (event, type) => {
    const currentNote = { ...noteContent };
    if (type === "heading") {
      currentNote.heading = event.target.value;
    } else if (type === "description") {
      currentNote.description = event.target.value;
    }
    updateNoteContent(currentNote);
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
            defaultValue={heading}
          />
          <textarea
            className="notes-textarea"
            placeholder="Write a note.."
            onChange={e => handleChange(e, "description")}
            defaultValue={description}
            readOnly={isTrash}
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

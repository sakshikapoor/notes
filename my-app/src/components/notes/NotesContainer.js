import React from "react";
import "./NotesContainer.css";
import { useDispatch, useSelector } from "react-redux";
import noteActions from "../../actions/notesActions";
import NoteList from "./NoteList";
import modalActions from "../../actions/modalAction";
import NoteCategory from "../../NoteCategory";
import { getDate } from "../../utils";
import Modal from './Modal';

const NotesContainer = () => {
  const EmptyNoteContent = {
    heading: "",
    description: ""
  };

  const selectedTab = useSelector(state => state.selectedTab)
  const dispatch = useDispatch();
  const isTrash = selectedTab === "trash"
  const openModal = () => {
    dispatch(modalActions.openModal(null, true));
  };

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };

  const modal = useSelector(state => state.modal);
  const isModalOpen = modal.isOpen;

  const saveNote = () => {
    const note = {
      content: modal.noteData.content,
      type: NoteCategory.others,
      date: getDate(),
      id: Math.floor(Math.random() * 1000000)
    };
    dispatch(noteActions.addNote(note));
    closeModal();
  };

  const handleChange = (event, type) => {
    const updatedNote = modal.noteData ? { ...modal.noteData.content } : EmptyNoteContent;
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
      type: modal.isNew ? "notes" : modal.noteData.type
    };
    dispatch(noteActions.updateNote(modal.noteData.id, note));
    closeModal();
  };

  const deleteNote = () => {
    const note = {
      content: modal.noteData.content,
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
  if (modal.isNew) {
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
  if (isTrash && !modal.isNew) {
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
      <Modal isModalOpen={isModalOpen} onClose={() => closeModal()}>
        <div className="notes-container">
          <input
            className="notes-heading"
            type="text"
            placeholder="Heading"
            onChange={e => handleChange(e, "heading")}
            value={noteContent.heading}
            readOnly={isTrash && !modal.isNew}
          />
          <textarea
            className="notes-textarea"
            placeholder="Write a note.."
            value={noteContent.description}
            onChange={e => handleChange(e, "description")}
            readOnly={isTrash && !modal.isNew}
          />
        </div>
        <div className="notes-action">
          {saveOrUpdateButton}
          {trashOrDeleteButton}
        </div>
      </Modal>
      <NoteList category={selectedTab} />
    </div >
  );
};

export default NotesContainer;

import NoteCategory from "../../NoteCategory";
import "./Note.css";

const actions = [
  {
    id: "pin",
    label: "pin",
    negativeLabel: "unpin",
    category: NoteCategory.pinned
  },
  {
    id: "archive",
    label: "archive",
    negativeLabel: "unarchive",
    category: NoteCategory.archive
  },
  {
    id: "trash",
    label: "trash",
    negativeLabel: "untrash",
    category: NoteCategory.trash
  }
];

// presenttational component for Note, behaviours defined in NoteList
const Note = ({ note, onActionClick, onNoteClick }) => {
  const actionBar = actions.map(action => {
    const label =
      action.category === note.type ? action.negativeLabel : action.label;

    // category that _will_ be applied is action is clicked
    const category =
      action.category === note.type ? NoteCategory.others : action.category;

    return (
      <button
        key={action.id}
        className="notes-action-type"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onActionClick(category);
        }}
      >
        [{label}]
      </button>
    );
  });

  return (
    <div
      key={note.id}
      style={{ animation: `fadeIn 1s` }}
      className="NotesContainer"
      onClick={onNoteClick}
    >
      <div className="note-type">{note.type}</div>
      <div className="note-heading">{note.content.heading}</div>
      <div className="note-content">{note.content.description}</div>
      <div className="note-date-created">
        Date Created: {note.date.toString()}
      </div>
      <div className="notes-action-container">{actionBar}</div>
    </div>
  );
};

export default Note;

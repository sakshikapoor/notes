import { useSelector } from "react-redux";
import "./NoteList.css";
import noteActions from "../../actions/notesActions";
import { useDispatch } from "react-redux";
import modalActions from "../../actions/modalAction";
import Note from "./Note";
import NoteCategory from "../../NoteCategory";

const notesToVisbilityMapping = [
  {
    id: "notes",
    visibleCategories: [NoteCategory.pinned, NoteCategory.others]
  },
  {
    id: "archive",
    visibleCategories: [NoteCategory.archive]
  },
  {
    id: "pinned",
    visibleCategories: [NoteCategory.pinned]
  },
  {
    id: "trash",
    visibleCategories: [NoteCategory.trash]
  }
];

const Notes = () => {
  const selectedTab = useSelector(state => state.selectedTab);
  const notes = useSelector(state => state.notes);
  const searchTerm = useSelector(state => state.search);
  const dispatch = useDispatch();

  let filterNotes;

  if (searchTerm.length) {
    // filter notes based on search term
    filterNotes = notes.filter(note => note.content.includes(searchTerm));
  } else {
    // filter notes based on selected tab
    filterNotes = notes.filter(note => {
      const mapping = notesToVisbilityMapping.find(
        mapping => mapping.id === selectedTab
      );

      let visible = [];
      if (!mapping) {
        console.error("could not find a visibility mapping", selectedTab);
        visible = [NoteCategory.pinned, NoteCategory.others]; // default to pinned and others
      }

      visible = mapping.visibleCategories;
      return visible.includes(note.type);
    });
  }

  const updateType = (note, type) => {
    const updatedNote = {
      content: note.content,
      type: type
    };
    dispatch(noteActions.updateNote(note.id, updatedNote));
  };

  const openModal = note => {
    dispatch(modalActions.openModal(note));
  };

  const notesView = filterNotes.map((note, i) => {
    return (
      <Note
        key={i}
        note={note}
        onActionClick={type => updateType(note, type)}
        onNoteClick={() => openModal(note)}
      />
    );
  });

  return notesView.length !== 0 ? (
    notesView
  ) : (
    <div className="empty-notes-placeholder">No notes created yet</div>
  );
};

export default Notes;

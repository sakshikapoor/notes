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

const EmptyPlaceholder = ({ isSearchActive, activeTab }) => {
  let message = "";

  if (isSearchActive) {
    message = "No search results found";
  } else if (activeTab === "pinned" || activeTab === "archive") {
    message = `No ${activeTab} notes found`;
  } else {
    message = "No notes created yet";
  }

  return <div className="empty-notes-placeholder">{message}</div>;
};

const Notes = () => {
  const selectedTab = useSelector(state => state.selectedTab);
  const notes = useSelector(state => state.notes);
  const searchTerm = useSelector(state => state.search);
  const dispatch = useDispatch();

  let filterNotes = [];

  const isSearchActive = searchTerm.length !== 0;
  if (isSearchActive) {
    // filter notes based on search term
    filterNotes = notes.filter(note =>
      Object.values(note.content).includes(searchTerm)
    );
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


  if (notesView.length !== 0) {
    return notesView;
  } else {
    return (
      <EmptyPlaceholder
        isSearchActive={isSearchActive}
        activeTab={selectedTab}
      />
    );
  }
};

export default Notes;

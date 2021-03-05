import { useSelector } from "react-redux";
import "./NoteList.css";
import noteActions from "../../actions/notesActions";
import { useDispatch } from "react-redux";

const Notes = () => {
  const selectedTab = useSelector(state => state.selectedTab);
  const notes = useSelector(state => state.notes);

  const filterNotes = notes.filter(note => note.type === selectedTab);
  const dispatch = useDispatch();

  const deleteNote = id => {
    dispatch(noteActions.deleteNote(id));
  };

  const openModal = id => {};
  const notesView = filterNotes.map((note, i) => {
    return (
      <div
        key={i}
        className="NotesContainer"
        onClick={() => openModal(note.id)}
      >
        <div className="delete" onClick={() => deleteNote(note.id)}>
          X
        </div>
        <div>Type: {note.type}</div>
        <div>Id: {note.id}</div>
        <div>Content: {note.content}</div>
        <div>Date: {note.date.toString()}</div>
      </div>
    );
  });
  // console.log(notesView);
  return <div>{notesView}</div>;
};

export default Notes;

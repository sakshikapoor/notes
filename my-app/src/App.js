import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotesContainer from "./components/notes/NotesContainer";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector(state => state.theme);

  return (
    <div className="App" id="App" data-theme={theme}>
      <Header />
      <div className="app-view">
        <Sidebar />
        <NotesContainer />
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotesContainer from "./components/notes/NotesContainer";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  const theme = useSelector(state => state.theme);

  return (
    <div className="App" id="App" data-theme={theme}>
      <Header />
      <div className="app-view">
        <Router>
          <Sidebar />
          <Route path="/notes/:category" component={NotesContainer}></Route>
        </Router>
      </div>
    </div>
  );
}

export default App;

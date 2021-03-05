import './App.css';
import Sidebar from './components/Sidebar'
import Header from './components/Header';
import NotesContainer from './components/notes/NotesContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-view">
        <Sidebar />
        <NotesContainer />
      </div>
    </div>
  );
}

export default App;

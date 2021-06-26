import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NotesContainer from "./components/notes/NotesContainer";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NotFound from './components/NotFound'

function App() {
  const theme = useSelector(state => state.theme);

  return (
    <div className="App" id="App" data-theme={theme}>
      <Header />
      <div className="app-view">
        <Router>
          <Switch>
            <Route path={['/notes', '/notes/:category', '/']} exact>
              <Sidebar />
              <NotesContainer />
            </Route>
            <Route path="/urlnotfound" component={NotFound} />
            <Redirect to="/urlnotfound" />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

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
            <Route path="/notes" exact component={Sidebar} />
            <Route path="/notes/:category" component={Sidebar} />
            <Route path="/" exact component={Sidebar} />
            <Redirect to="/urlnotfound" />
          </Switch>
          <Switch>
            <Route path="/urlnotfound" component={NotFound} />
            <Route path="/" component={NotesContainer} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

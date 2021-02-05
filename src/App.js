import "./App.css";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GamePage from "./components/GamePage";

function App() {
  return (
    <div className="app-content">
      <Router>
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/game-page" component={GamePage} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

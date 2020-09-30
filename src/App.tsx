import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import GameList from "./components/GameList";
import ReactionTime from "./components/ReactionTime/ReactionTime";
import AimTrainer from "./components/AimTrainer/AimTrainer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container-fluid mt-3">
          <Switch>
            <Route exact path="/">
              <GameList />
            </Route>
            <Route exact path="/reaction-time">
              <ReactionTime />
            </Route>
            <Route exact path="/aim-trainer">
              <AimTrainer />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

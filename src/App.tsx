import React from "react";
import Header from "./components/Header";
import ReactionTime from "./components/ReactionTime";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-fluid mt-5">
        <ReactionTime />
      </div>
    </div>
  );
}

export default App;

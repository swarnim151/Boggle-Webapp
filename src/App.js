import React from "react";
import "./App.css";
import Boggle from "./boggle.js";

import FindAllValidWords from "./extra";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Boggle </h1>
        <Boggle></Boggle>
      </header>
    </div>
  );
}

export default App;

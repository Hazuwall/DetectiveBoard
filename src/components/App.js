import React from "react";
import "./App.css";
import Board from "./Board";
import Toolbar from "./Toolbar";

function App() {
  return (
    <div className="app">
      <Toolbar />
      <Board />
    </div>
  );
}

export default App;

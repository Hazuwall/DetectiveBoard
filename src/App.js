import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Board from "./Board";

function App() {
  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}

export default App;

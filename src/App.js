import React from "react";
// import logo from "./logo.svg";
import "./App.css";

import { BarGraph } from "./Components/BarGraph";
import { Graph } from "./Components/Graph";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Graph />
        <BarGraph />
      </header>
    </div>
  );
}

export default App;

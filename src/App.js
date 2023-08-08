import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import Offline from "./components/Offline";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { drawRect } from "./utilities";
import Live from "./components/Live";

function App() {
  return (
    <Router>
      <div >
        <div >
          <button onClick={() => window.location.href = '/live'}>
            Live Mode
          </button>
          <button onClick={() => window.location.href = '/offline'}>
            Offline Mode
          </button>
        </div>
        <Routes>
          <Route path="/live" element={<Live />} />
          <Route path="/offline" element={<Offline />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

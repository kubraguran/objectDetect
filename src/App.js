import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import Offline from "./components/offline";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { drawRect } from "./utilities";
import Live from "./components/live";
import Menu from "./components/menu";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex flex-row">
        <Menu />
        <div>
          <Routes>
            <Route path="/live" element={<Live />} />
            <Route path="/offline" element={<Offline />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

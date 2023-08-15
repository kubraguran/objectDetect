import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Offline from "./components/offline";
import Live from "./components/live";
import Menu from "./components/menu";
import Options from "./components/options";
import "./App.css";
import Information from "./components/information";

function App() {
  return (
    <Router>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Menu />
          <Options />
        </div>
        <div>
          <Routes>
            <Route path="/live" element={<Live />} />
            <Route path="/offline" element={<Offline />} />
          </Routes>
        </div>
        <Information />
      </div>
    </Router>
  );
}

export default App;

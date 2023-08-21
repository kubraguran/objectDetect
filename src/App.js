import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Offline from "./components/Offline";
import Live from "./components/Live";
import Menu from "./components/Menu";
import Options from "./components/Options";
import "./App.css";
import Information from "./components/Information";

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

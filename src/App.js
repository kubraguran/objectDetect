import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Offline from "./components/offline";
import Live from "./components/live";
import Menu from "./components/menu";
import Options from "./components/options";
import Information from "./components/information";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex w-full my-10 content-center mx-auto space-x-4 overflow-hidden overflow-x-scroll scrollbar-hide 2xl:justify-center">
        <div className="flex flex-nowrap flex-row shrink-0">
          <div className="flex flex-col shrink-0">
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
      </div>
    </Router>
  );
}

export default App;

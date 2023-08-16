import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App className="flex" />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

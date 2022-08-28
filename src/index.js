import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// axios.defaults.baseURL = `http://localhost:8080`;
// axios.defaults.headers.common["Pragma"] =
//   "Bearer " + localStorage.getItem("token");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

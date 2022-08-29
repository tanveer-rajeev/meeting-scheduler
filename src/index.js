import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// axios.defaults.baseURL = `http://localhost:8080`;
// axios.defaults.headers.common["Pragma"] =
//   "Bearer " + sessionStorage.getItem("token");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

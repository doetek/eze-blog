import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Bootstrap Bundle JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === 'production') disableReactDevTools ();



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <App />
  </>
);

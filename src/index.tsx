import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import App from "./App";
import { APP_NAME } from "./Constants";
import * as serviceWorker from "./serviceWorker";

declare global {
  interface Window {
    __app_name: string;
  }
}
window.__app_name = APP_NAME;

ReactDOM.render(<App />, document.getElementById("root"));



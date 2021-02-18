/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
// import { rootReducer } from "./modules";
import { Provider } from "react-redux";
import { rootReducer } from "./store/modules";
import "./index.scss";
import App from "./App";

const DEBUG = process.env.NODE_ENV === "development";
// @ts-ignore
const state = createStore(rootReducer, DEBUG && composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={state}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

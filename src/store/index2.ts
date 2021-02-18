/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./modules";

const DEBUG = process.env.NODE_ENV === "development";
// @ts-ignore
export default createStore(rootReducer, DEBUG && composeWithDevTools());

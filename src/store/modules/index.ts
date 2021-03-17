/* eslint-disable import/no-named-default */
/* eslint-disable import/prefer-default-export */
import { combineReducers } from "redux";
import { default as controlReducer } from "./control";

export const rootReducer = combineReducers({
  control: controlReducer,
});

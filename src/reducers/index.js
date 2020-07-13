import { combineReducers } from "redux";
import board from "./board";
import items from "./items";

export default combineReducers({ board, items });

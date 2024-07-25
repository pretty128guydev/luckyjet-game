// reducers/index.js

import { combineReducers } from "redux";
import historyReducer from "./historyReducer";
import moneyReducer from "./moneyReducer";
import scoreReducer from "./scoreReducer";

const rootReducer = combineReducers({
  history: historyReducer,
  money: moneyReducer,
  score: scoreReducer
});

export default rootReducer;

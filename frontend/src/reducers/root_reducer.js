import { combineReducers } from "redux";
import session from "./session_api_reducer";
import errors from "./errors_reducer";
import chat from './chat_reducer'

const RootReducer = combineReducers({
  session,
  chat,
  errors,
});

export default RootReducer;

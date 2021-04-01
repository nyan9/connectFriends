import { combineReducers } from "redux";
import session from "./session_api_reducer";
import errors from "./errors_reducer";
import chat from './chat_reducer'
import users from './user_reducer'
import rating from './rating_reducer'

const RootReducer = combineReducers({
  session,
  users,
  rating,
  chat,
  errors,
});

export default RootReducer;

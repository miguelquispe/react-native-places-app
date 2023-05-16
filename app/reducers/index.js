// import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/";
import locationsReducer from "../features/locations";
import likesReducer from "../features/likes";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  auth: authReducer,
  locations: locationsReducer,
  likes: likesReducer,
});

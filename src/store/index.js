import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { persistReducer, persistStore } from "redux-persist";

import auth from "./slices/auth";
import locations from "./slices/places";
import likes from "./slices/likes";
import { locationsApi } from "./services/places";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whiteList: ["likes"],
};

const rootReducer = combineReducers({
  auth,
  locations,
  likes,
  [locationsApi.reducerPath]: locationsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(locationsApi.middleware);
  },
});

export const persistor = persistStore(store);

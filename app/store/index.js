import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { locationsApi } from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistCombineReducers,
  persistReducer,
  persistStore,
} from "redux-persist";
import auth from "../features/";
import likes from "../features/likes";
import locations from "../features/locations";

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
  // reducer: {
  // auth: persistReducer(persistConfig, authReducer),
  // locations: persistReducer(persistConfig, locationsReducer),
  // likes: persistReducer(persistConfig, likesReducer),
  // [locationsApi.reducerPath]: locationsApi.reducer,
  // rootReducer,
  // },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(locationsApi.middleware);
  },
});

export const persistor = persistStore(store);

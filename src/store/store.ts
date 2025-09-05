import { createMigrate, persistReducer } from "redux-persist";
import storage from "localforage";
import { createStore, compose } from "redux";
import { persistStore } from "redux-persist";
import "firebase/compat/firestore";

import { migrations } from "./const";
// import { IMPORT_PROJECT, OPEN_ALERT_SNACKBAR } from "./types";
import firebase from "../helpers/firebase";
import { enablePatches } from "immer";
import simulator from "./simulator";

export const firestore = firebase.firestore();

const persistConfig = {
  key: "root",
  version: 3,
  storage,
  migrate: createMigrate(migrations as any, { debug: true }),
  debug: true,
  writeFailHandler: (err: any) => console.error("storage engine failed during setItem()", err),
  whitelist: ["simulator", "symbolEntry"], // Explicitly list what to persist
};

enablePatches();

const persistedReducer = persistReducer(persistConfig, simulator as any);

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistedReducer, composeEnhancers());
export type RootState = ReturnType<typeof simulator> & ReturnType<typeof persistedReducer>;

export const persistor = persistStore(store);

// Removed manual persistence handling

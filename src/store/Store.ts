// components/app/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import userReducer from "./slices/UserSlice";     // 👈 slice de usuario
import drawerReducer from "./slices/DrawerSlices"; // 👈 slice del drawer

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // 👈 solo persistimos el usuario con token
};

// Reducers combinados
const rootReducer = combineReducers({
  user: userReducer,
  drawer: drawerReducer, // 👈 el drawer vive en memoria (no persistido)
});

// Reducer con persistencia
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necesario para redux-persist
    }),
});

export const persistor = persistStore(store);

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
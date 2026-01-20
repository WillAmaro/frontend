// components/app/slices/drawerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definimos el tipo de cada ruta del Drawer
export interface DrawerRoute {
  id: number;
  label: string;
  path: string;
  icon?: any; // opcional: nombre del ícono a renderizar
  children?: DrawerRoute[]; // subrutas (para menús anidados)
}

// Estado del drawer
interface DrawerState {
  routes: DrawerRoute[];
}

// Estado inicial
const initialState: DrawerState = {
  routes: [],
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    // Guardamos todas las rutas que vienen del backend
    setRoutes: (state, action: PayloadAction<DrawerRoute[]>) => {
      state.routes = action.payload;
    },
    // Agregar una nueva ruta al drawer
    addRoute: (state, action: PayloadAction<DrawerRoute>) => {
      state.routes.push(action.payload);
    },
    // Resetear el drawer (ej: al hacer logout)
    clearRoutes: (state) => {
      state.routes = [];
    },
  },
});

// Exportamos acciones y reducer
export const { setRoutes, addRoute, clearRoutes } = drawerSlice.actions;
export default drawerSlice.reducer;
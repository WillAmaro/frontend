// components/app/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Estado del usuario autenticado (basado en /me + token)
interface UserState {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  tenant_id: number;
  role_id: number;
  defaultPath:string;
  role: {
    id: number;
    tenant_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string | null;
  } | null;
  person: {
    id: number;
    user_id: number;
    type_per_id: number;
    type_doc_id: number;
    document_number: string;
    first_name: string;
    last_name: string;
    phone: string;
    ubigeo: string;
    address: string;
    additional_info: string;
    created_at: string;
    updated_at: string | null;
  } | null;
  token: string;
  refreshToken: string;
}

// Estado inicial vacío
const initialState: UserState = {
  id: 0,
  name: "",
  email: "",
  email_verified_at: null,
  created_at: "",
  updated_at: "",
  tenant_id: 0,
  role_id: 0,
  role: null,
  person: null,
  token: "",
  refreshToken: "",
  defaultPath : "/"
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Guardamos el usuario completo
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...action.payload };
    },
    // Cerramos sesión (reseteamos estado)
    logout: () => {
      return initialState;
    },
  },
});

// Exportamos acciones y reducer
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {
  companies: [],
  company : 1
};

export const companySlice = createSlice({
    name:"company",
    initialState,
      reducers: {

    setCompany : (state,action:PayloadAction<any>) => {
        state.company = action.payload
    },
    // Guardamos todas las rutas que vienen del backend
    setCompanies: (state, action: PayloadAction<any[]>) => {
      state.companies = action.payload;
    },
    // Agregar una nueva ruta al drawer
    addCompany: (state, action: PayloadAction<any>) => {
      state.companies.push(action.payload);
    },
    // Resetear el drawer (ej: al hacer logout)
    clearCompanies: (state) => {
      state.companies = [];
    },
  },
}) 


export const { setCompanies, addCompany, clearCompanies, setCompany } = companySlice.actions;
export default companySlice.reducer;
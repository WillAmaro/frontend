// src/services/api/LoginService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7138";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  default_path: string;
  // Agregar otros campos que venga del backend
}

// Función para Client Components (NO usa cookies de servidor)
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/api/User/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // Importante: permite que el backend maneje cookies
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error en login");
  }

  const response = await res.json();
  
  // Guardar token en localStorage (client-side)
  if (response.access_token) {
    localStorage.setItem("token", response.access_token);
    if (response.refresh_token) {
      localStorage.setItem("refreshToken", response.refresh_token);
    }
  }

  return response;
}

// Función para obtener el token guardado
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// Función para obtener el refresh token
export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

// Función para limpiar tokens (logout)
export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}

// Función para verificar si hay sesión activa
export function hasActiveSession(): boolean {
  return !!getToken();
}
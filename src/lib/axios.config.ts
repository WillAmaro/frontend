// lib/axios.config.ts

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Crear instancia de axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de peticiones (agregar token)
apiClient.interceptors.request.use(
  (config:any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas (manejo de errores)
apiClient.interceptors.response.use(
  (response:any) => response,
  async (error:any) => {
    const originalRequest = error.config;

    // Si el token expiró (401) y no hemos reintentado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentar refrescar el token
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/api/auth/refresh`,
            { refreshToken }
          );

          const { token } = response.data;
          localStorage.setItem("token", token);

          // Reintentar petición original con nuevo token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Si falla el refresh, redirigir a login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Si el tenant es requerido pero no está presente
    if (error.response?.status === 400 && 
        error.response?.data?.message?.includes("tenantId is required")) {
      console.error("TenantId requerido pero no proporcionado");
    }

    // Si es un error de conflicto (hub ya existe)
    if (error.response?.status === 409) {
      console.error("Conflicto:", error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
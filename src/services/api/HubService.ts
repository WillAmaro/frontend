// services/api/hubService.ts
import apiClient from "@/src/lib/axios.config";
import { 
  CreateHubRequest, 
  HubDTO, 
  UpdateHubRequest 
} from "@/src/types/hub.types";

export const hubService = {
  /**
   * Obtener todos los hubs por tenant
   */
  getAllHubs: async (tenantId: string): Promise<HubDTO[]> => {
    try {
      const response = await apiClient.get("/api/v1/hubs", {
        params: { tenantId },
      });
      console.log("✅ Datos recibidos:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching hubs:", error);
      throw error;
    }
  },

  /**
   * Obtener hub por ID
   */
  getHubById: async (id: string): Promise<HubDTO> => {
    try {
      const response = await apiClient.get(`/api/v1/hubs/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching hub:", error);
      throw error;
    }
  },

  /**
   * Crear nuevo hub
   */
  createHub: async (data: CreateHubRequest): Promise<HubDTO> => {
    try {
      const response = await apiClient.post("/api/v1/hubs", data);
      return response.data;
    } catch (error) {
      console.error("Error creating hub:", error);
      throw error;
    }
  },

  /**
   * Actualizar hub existente
   */
  updateHub: async (id: string, data: UpdateHubRequest): Promise<HubDTO> => {
    try {
      const response = await apiClient.put(`/api/v1/hubs/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating hub:", error);
      throw error;
    }
  },

  /**
   * Eliminar hub
   */
  deleteHub: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/v1/hubs/${id}`);
    } catch (error) {
      console.error("Error deleting hub:", error);
      throw error;
    }
  },
};
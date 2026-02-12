// services/api/scheduleService.ts

import apiClient from "@/src/lib/axios.config";
import {
  ScheduleGrid,
  Technician,
  ServiceOrder,
  Attention,
  CreateAttentionRequest,
  UpdateAttentionRequest,
} from "@/src/types/schedule.types";

export const scheduleService = {
  /**
   * Obtener todos los técnicos disponibles
   */
  getTechnicians: async (tenantId: string): Promise<Technician[]> => {
    try {
      const response = await apiClient.get("/api/v1/technicians", {
        params: { tenantId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching technicians:", error);
      throw error;
    }
  },

  /**
   * Obtener órdenes de servicio pendientes
   */
  getPendingServiceOrders: async (
    tenantId: string,
  ): Promise<ServiceOrder[]> => {
    try {
      const response = await apiClient.get("/api/v1/service-orders/pending", {
        params: { tenantId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching service orders:", error);
      throw error;
    }
  },

  /**
   * Obtener atenciones programadas para una fecha
   */
  getAttentionsByDate: async (
    tenantId: string,
    date: string,
  ): Promise<Attention[]> => {
    try {
      const response = await apiClient.get("/api/v1/attentions", {
        params: { tenantId, date },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching attentions:", error);
      throw error;
    }
  },

  /**
   * Obtener grid completo de schedule
   */
  getScheduleGrid: async (
    tenantId: string,
    date: string,
  ): Promise<ScheduleGrid> => {
    try {
      const response = await apiClient.get("/api/v1/schedule/grid", {
        params: { tenantId, date },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching schedule grid:", error);
      throw error;
    }
  },

  /**
   * Crear nueva atención
   */
  createAttention: async (data: CreateAttentionRequest): Promise<Attention> => {
    try {
      const response = await apiClient.post("/api/v1/attentions", data);
      return response.data;
    } catch (error) {
      console.error("Error creating attention:", error);
      throw error;
    }
  },

  /**
   * Actualizar atención (mover técnico/horario)
   */
  updateAttention: async (
    id: string,
    data: UpdateAttentionRequest,
  ): Promise<Attention> => {
    try {
      const response = await apiClient.put(`/api/v1/attentions/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating attention:", error);
      throw error;
    }
  },

  /**
   * Cancelar atención
   */
  cancelAttention: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/v1/attentions/${id}`);
    } catch (error) {
      console.error("Error canceling attention:", error);
      throw error;
    }
  },

  /**
   * Cambiar estado de atención
   */
  updateAttentionStatus: async (
    id: string,
    status: "en_curso" | "completada",
  ): Promise<Attention> => {
    try {
      const response = await apiClient.patch(
        `/api/v1/attentions/${id}/status`,
        { status },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating attention status:", error);
      throw error;
    }
  },
};

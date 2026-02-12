// lib/mockData.ts

import { Attention, ServiceOrder, Technician } from "../types/schedule.types";


export const mockTechnicians: Technician[] = [
  {
    id: "tech-1",
    name: "Carlos",
    lastName: "Rodríguez",
    specialization: "Instalación HFC",
    isAvailable: true,
    color: "#2196F3",
  },
  {
    id: "tech-2",
    name: "María",
    lastName: "González",
    specialization: "Reparación FTTH",
    isAvailable: true,
    color: "#4CAF50",
  },
  {
    id: "tech-3",
    name: "Jorge",
    lastName: "Martínez",
    specialization: "Instalación DTH",
    isAvailable: false,
    color: "#FF9800",
  },
  {
    id: "tech-4",
    name: "Ana",
    lastName: "López",
    specialization: "Soporte LTE",
    isAvailable: true,
    color: "#9C27B0",
  },
];

export const mockServiceOrders: ServiceOrder[] = [
  {
    id: "so-1",
    code: "OS-2024-001",
    clientName: "Juan Pérez",
    address: "Av. Javier Prado Este 123, San Isidro",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 60,
    materials: ["Cable coaxial", "Modem", "Splitter"],
  },
  {
    id: "so-2",
    code: "OS-2024-002",
    clientName: "María Torres",
    address: "Calle Los Olivos 456, Miraflores",
    serviceType: "Reparación de señal",
    priority: "media",
    estimatedDuration: 45,
    materials: ["Conector F", "Cable RG6"],
  },
  {
    id: "so-3",
    code: "OS-2024-003",
    clientName: "Roberto Sánchez",
    address: "Jr. Las Flores 789, San Borja",
    serviceType: "Instalación FTTH",
    priority: "alta",
    estimatedDuration: 90,
    materials: ["Fibra óptica", "ONT", "Patch cord"],
  },
  {
    id: "so-4",
    code: "OS-2024-004",
    clientName: "Carmen Díaz",
    address: "Av. Arequipa 321, Lince",
    serviceType: "Cambio de equipo",
    priority: "baja",
    estimatedDuration: 30,
    materials: ["Modem nuevo", "Cable ethernet"],
  },
  {
    id: "so-5",
    code: "OS-2024-005",
    clientName: "Luis Herrera",
    address: "Calle Santa Cruz 654, San Miguel",
    serviceType: "Instalación DTH",
    priority: "media",
    estimatedDuration: 75,
    materials: ["Antena", "Decodificador", "Cable coaxial"],
  },
];

export const mockAttentions: Attention[] = [
  {
    id: "att-1",
    serviceOrderId: "so-1",
    technicianId: "tech-1",
    date: new Date().toISOString().split("T")[0],
    startTime: "08:00",
    endTime: "09:00",
    status: "programada",
    serviceOrder: mockServiceOrders[0],
  },
  {
    id: "att-2",
    serviceOrderId: "so-2",
    technicianId: "tech-1",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "10:00",
    status: "en_curso",
    serviceOrder: mockServiceOrders[1],
  },
  {
    id: "att-3",
    serviceOrderId: "so-3",
    technicianId: "tech-2",
    date: new Date().toISOString().split("T")[0],
    startTime: "08:00",
    endTime: "09:00",
    status: "programada",
    serviceOrder: mockServiceOrders[2],
  },
];

// Función para generar datos mock con delay (simular API)
export const mockApi = {
  getTechnicians: (): Promise<Technician[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTechnicians), 500);
    });
  },

  getPendingServiceOrders: (): Promise<ServiceOrder[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockServiceOrders), 500);
    });
  },

  getAttentionsByDate: (date: string): Promise<Attention[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const todayAttentions = mockAttentions.filter(
          (att) => att.date === date
        );
        resolve(todayAttentions);
      }, 500);
    });
  },
};
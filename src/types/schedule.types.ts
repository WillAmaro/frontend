// types/schedule.types.ts

export type AttentionStatus = 
  | "programada" 
  | "en_curso" 
  | "completada" 
  | "cancelada";

export interface Technician {
  id: string;
  name: string;
  lastName: string;
  specialization: string;
  isAvailable: boolean;
  color: string; // Color para identificación visual
  avatar?: string;
}

export interface ServiceOrder {
  id: string;
  code: string;
  clientName: string;
  address: string;
  serviceType: string;
  priority: "alta" | "media" | "baja";
  estimatedDuration: number; // en minutos
  materials: string[];
}

export interface Attention {
  id: string;
  serviceOrderId: string;
  technicianId: string;
  date: string; // ISO date
  startTime: string; // "08:00"
  endTime: string; // "09:00"
  status: AttentionStatus;
  notes?: string;
  serviceOrder: ServiceOrder;
}

export interface TimeSlot {
  hour: string; // "8am-9am"
  startTime: string; // "08:00"
  endTime: string; // "09:00"
  displayLabel: string; // "8am - 9am"
}

export interface ScheduleGrid {
  date: string;
  technicians: Technician[];
  timeSlots: TimeSlot[];
  attentions: Attention[];
}

export interface CreateAttentionRequest {
  serviceOrderId: string;
  technicianId: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface UpdateAttentionRequest {
  technicianId?: string;
  startTime?: string;
  endTime?: string;
  status?: AttentionStatus;
  notes?: string;
}

// Para Drag & Drop
export interface DraggableServiceOrder extends ServiceOrder {
  dragType: "service-order";
}

export interface DroppableSlot {
  technicianId: string;
  timeSlot: TimeSlot;
}
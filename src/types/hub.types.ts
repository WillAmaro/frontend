// types/hub.types.ts

export interface HubDTO {
  id: string;
  tenantId: string;
  districtId: string;
  hubCode: string;
  hubName: string;
  address: string;
  districtName: string;
  regionName: string;
  countryName: string;
  maxCapacity: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  isActive: boolean;
}

export interface CreateHubRequest {
  tenantId: string;
  districtId: string;
  hubCode: string;
  hubName: string;
  address: string;
  maxCapacity: number;
}

export interface UpdateHubRequest {
  districtId?: string;
  hubCode?: string;
  hubName?: string;
  address?: string;
  maxCapacity?: number;
  status?: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  isActive?: boolean;
}

export interface HubFilters {
  search: string;
  status?: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  regionName?: string;
}
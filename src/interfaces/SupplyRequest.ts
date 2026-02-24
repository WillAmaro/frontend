type ProductType = "EQUIPMENT" | "MATERIAL" | "TOOL";
type EntidadDestino = "CLARO" | "LEMCORP";

interface SupplyRequestItem {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  itemDescription: string;
  productType: ProductType;
  quantityUsedInPeriod: number;
  requestedQuantity: number;
  approvedQuantity: number | null;
  deliveredQuantity: number;
  pendingQuantity: number;
  unitPrice: number;
  totalPrice: number;
  priority: number;
  isUrgent: boolean;
  isFullyDelivered: boolean;
  isPartiallyDelivered: boolean;
  deliveryPercentage: number;
  specifications?: string;
  uom?: string;
}

interface SupplyRequestDto {
  id: string;
  requestNumber: string;
  status: string;
  periodStartDate: string;
  periodEndDate: string;
  hubId: string;
  hubName: string | null;
  items: SupplyRequestItem[];
  totalItemsCount: number;
  totalQuantity: number;
  totalEstimatedValue: number;
  requestedDeliveryDate: string;
  actualDeliveryDate: string | null;
  notes: string;
  justification: string | null;
  createdBy: string;
  createdByName: string | null;
  createdAt: string;
  approvedBy: string | null;
  approvedByName: string | null;
  approvedAt: string | null;
  deliveredBy: string | null;
  deliveredByName: string | null;
  deliveredAt: string | null;
}
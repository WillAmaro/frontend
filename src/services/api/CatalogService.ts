import apiClient from "@/src/lib/axios.config";
import { 
  CatalogDTO

} from "@/src/types/Catalog.types";
export const CatalogService = {
    /**
     * Obtener todos los Catalog
     */
    getAllCatalogs: async (): Promise<CatalogDTO> => {

        try {
            const response = await apiClient.get("/api/catalogs");
            console.log("✅ Datos recibidos:", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching catalogs:", error);
            throw error;
        }

    }


}
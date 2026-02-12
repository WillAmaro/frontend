// src/services/api/AuthService.ts
import { supabase, supabaseLPS } from "@/src/lib/supabase";

export interface UserSession {
  exists: boolean;
  needs_profile_completion: boolean;
  status: "not_found" | "pending" | "active" | "inactive" | "suspended" | "no_role";
  message?: string;
  user_id?: string;
  user?: {
    user_id: string;
    tenant_id: string;
    full_name: string;
    email: string;
    employee_code: string;
    position: string;
    department: string;
    avatar_url: string;
    user_status: string;
    tenant_code: string;
    tenant_name: string;
    role: {
      role_id: string;
      role_code: string;
      role_name: string;
      role_description: string;
      role_level: number;
      permissions: Array<{
        route: string;
        route_code: string;
        route_name: string;
        route_icon: string;
        actions: string[];
      }>;
    };
  };
}

export interface CompleteProfileData {
  tenant_id: string;
  employee_code: string;
  first_name: string;
  last_name: string;
  document_type: "DNI" | "CE" | "PASSPORT" | "RUC";
  document_number: string;
  phone?: string;
  mobile?: string;
  position?: string;
  department?: string;
}

export interface Tenant {
  tenant_id: string;
  tenant_code: string;
  tenant_name: string;
  tenant_legal_name: string;
  tenant_ruc: string;
}

export const authService = {
  // Verificar sesión de usuario (usa supabaseLPS)
  async checkUserSession(userId: string): Promise<UserSession> {
    console.log("🔍 Verificando sesión del usuario:", userId);
    
    try {
      // ✅ Usar supabaseLPS para funciones del schema LPS_ERP_LATAM
      const { data, error } = await supabaseLPS.rpc(
        "get_or_create_user_session",
        { p_auth_user_id: userId }
      );

      if (error) {
        console.error("❌ Error en RPC get_or_create_user_session:", error);
        throw new Error(`Error al verificar sesión: ${error.message}`);
      }

      console.log("✅ Datos de sesión obtenidos:", data);
      return data as UserSession;
    } catch (err: any) {
      console.error("❌ Error completo:", err);
      throw err;
    }
  },

  // Obtener tenants disponibles (usa supabaseLPS)
  async getTenants(): Promise<Tenant[]> {
    console.log("🏢 Obteniendo lista de tenants...");
    
    try {
      const { data, error } = await supabaseLPS.rpc("get_active_tenants");

      if (error) {
        console.error("❌ Error en RPC get_active_tenants:", error);
        throw new Error(`Error al obtener empresas: ${error.message}`);
      }

      console.log("✅ Tenants obtenidos:", data);
      return data || [];
    } catch (err: any) {
      console.error("❌ Error completo:", err);
      throw err;
    }
  },

  // Completar perfil de usuario (usa supabaseLPS)
  async completeProfile(
    userId: string,
    profileData: CompleteProfileData
  ): Promise<{ success: boolean; message: string; status?: string }> {
    console.log("📝 Completando perfil del usuario:", userId);
    
    try {
      const { data, error } = await supabaseLPS.rpc("complete_user_profile", {
        p_user_id: userId,
        p_tenant_id: profileData.tenant_id,
        p_employee_code: profileData.employee_code,
        p_first_name: profileData.first_name,
        p_last_name: profileData.last_name,
        p_document_type: profileData.document_type,
        p_document_number: profileData.document_number,
        p_phone: profileData.phone || null,
        p_mobile: profileData.mobile || null,
        p_position: profileData.position || null,
        p_department: profileData.department || null,
      });

      if (error) {
        console.error("❌ Error en RPC complete_user_profile:", error);
        throw new Error(`Error al completar perfil: ${error.message}`);
      }

      console.log("✅ Perfil completado:", data);
      return data;
    } catch (err: any) {
      console.error("❌ Error completo:", err);
      throw err;
    }
  },

  // Obtener rutas del menú (usa supabaseLPS)
  async getUserMenuRoutes(userId: any): Promise<any[]> {
    console.log("🗺️ Obteniendo rutas del usuario:", userId);
    
    try {
      const { data, error } = await supabaseLPS.rpc("get_routes_by_role", {
        p_role_id: userId,
      });

      if (error) {
        console.error("❌ Error en RPC get_user_menu_routes:", error);
        throw new Error(`Error al obtener rutas: ${error.message}`);
      }

      console.log("✅ Rutas obtenidas:", data);
      return data || [];
    } catch (err: any) {
      console.error("❌ Error completo:", err);
      throw err;
    }
  },

  // Logout (usa supabase normal porque es auth)
  async logout() {
    console.log("👋 Cerrando sesión...");
    // ✅ Usar supabase normal para auth
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
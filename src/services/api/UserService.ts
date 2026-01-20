// src/services/userService.ts
//env ENV_PRODUCTION = "www.dctechperu.pe/backend"
const API_URL = "https://main.lpsgrupolatam.dev";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  default_path : string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  type_per_id: number;
  type_doc_id: number;
  document_number: string;
  phone?: string; // opcional
  ubigeo?: string; // opcional
  address?: string; // opcional
  password: string;
  password_confirmation: string;
  tenant_id: number;
}

//  Respuesta al registrar usuario
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role_id: number;
      tenant_id: number;
      created_at: string;
      updated_at: string;
    };
    token: string;
  };
}

export interface RefreshResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface LogoutResponse {
  message: string;
}

// NUEVO: Usuario (para búsqueda por ID)
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  tenant_id: number;
  role_id: number;
  role: {
    id: number;
    tenant_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string | null;
  };
  person: {
    id: number;
    user_id: number;
    type_per_id: number;
    type_doc_id: number;
    document_number: string;
    first_name: string;
    last_name: string;
    phone: string;
    ubigeo: string;
    email: string;
    address: string;
    additional_info: string;
    created_at: string;
    updated_at: string | null;
  };
}

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  type_doc_id: number;
  document_number: string;
  phone: string;
  ubigeo: string;
  address: string;
  role_id: number;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface MeResponse {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  tenant_id: number;
  role_id: number;
  role: {
    id: number;
    tenant_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string | null;
  };
  person: {
    id: number;
    user_id: number;
    type_per_id: number;
    type_doc_id: number;
    document_number: string;
    first_name: string;
    last_name: string;
    phone: string;
    ubigeo: string;
    address: string;
    additional_info: string;
    created_at: string;
    updated_at: string | null;
  };
}

export interface Module {
  icon: string;
  path: string;
  label: string;
  children: Module[];
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

//  Respuesta de búsqueda de usuarios
export type SearchUsersResponse = PaginatedResponse<User>;

export const userService = {
  // 1. Login
  // async login(data: LoginRequest): Promise<LoginResponse> {
  //   const res = await fetch(`${API_URL}/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (!res.ok) {
  //     throw new Error("Error en login");
  //   }
    
  //   return res.json();
  // },

  async register(
    data: RegisterRequest,
    token: string
  ): Promise<RegisterResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 el backend lo pide
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error en registro");
    }

    return res.json();
  },

  // 3. Refresh token
  async refreshToken(token: string): Promise<RefreshResponse> {
    const res = await fetch(`${API_URL}/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al refrescar token");
    }

    return res.json();
  },

  // 4. Logout
  async logout(token: string): Promise<LogoutResponse> {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al cerrar sesión");
    }

    return res.json();
  },

// 5. Obtener Usuario por ID (manteniendo success y message)
async getUserById(id: number, token: string): Promise<ApiResponse<User>> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener usuario");
  }

  const json: ApiResponse<User> = await res.json();
  return json; // 👈 devuelve { success, message, data }
}
,

  // 6. Actualizar Usuario por ID
  async updateUserById(
    id: number,
    data: UpdateUserRequest,
    token: string
  ): Promise<UpdateUserResponse> {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar usuario");
    }

    return res.json() as Promise<UpdateUserResponse>;
  },

  // 7. Obtener usuario autenticado (/me)
  async me(token: string): Promise<MeResponse> {
    const res = await fetch(`${API_URL}/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener el usuario autenticado");
    }

    return res.json();
  },

  // 8. Obtener módulos por rol
  async getModulesByRole(roleId: number, token: string): Promise<ApiResponse<Module[]>> {
    const res = await fetch(`${API_URL}/modules/${roleId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener módulos por rol");
    }

    return res.json();
  },

  // 9. Buscar usuarios con paginación
  async searchUsers(
    query: string,
    token: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<SearchUsersResponse> {
    const url = `${API_URL}/users/search?s=${encodeURIComponent(
      query
    )}&page=${page}&pageSize=${pageSize}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al buscar usuarios");
    }

    // 👇 Extraer `data` para que coincida con PaginatedResponse<User>
    const json: ApiResponse<SearchUsersResponse> = await res.json();
    return json.data;
  },
};
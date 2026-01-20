// Servicio para manejar JWT en el cliente (similar a UserService de C#)

interface JWTClaims {
  id: string;
  email: string;
  name: string;
  surname: string;
  profilePic: string;
  tel: string;
  roles: string[];
  permissions: string[];
}

export class JWTService {
  // Decodificar JWT sin validación (solo lectura de claims)
  static decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  // Verificar si el token está expirado
  static checkTokenIsValid(token: string | null | undefined): boolean {
    if (!token || token.trim() === '') {
      return false;
    }

    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) {
        return false;
      }

      // exp viene en segundos, Date.now() en milisegundos
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();

      return expirationTime > currentTime;
    } catch (error) {
      console.error('Error validando token:', error);
      return false;
    }
  }

  // Leer propiedades del JWT (equivalente a ReadJWTProperties de C#)
  static readJWTProperties(token: string): JWTClaims | null {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded) {
        return null;
      }

      // Mapear claims del JWT a la estructura esperada
      // Los nombres de claims pueden variar según tu implementación del backend
      return {
        id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || 
            decoded.sub || 
            decoded.id || 
            '',
        email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || 
               decoded.email || 
               '',
        name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 
              decoded.name || 
              '',
        surname: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'] || 
                 decoded.surname || 
                 '',
        profilePic: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri'] || 
                    decoded.picture || 
                    '',
        tel: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'] || 
             decoded.phone || 
             '',
        roles: this.extractClaims(decoded, 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role') || 
               decoded.roles || 
               [],
        permissions: this.extractClaims(decoded, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authentication') || 
                     decoded.permissions || 
                     [],
      };
    } catch (error) {
      console.error('Error leyendo propiedades JWT:', error);
      return null;
    }
  }

  // Extraer claims que pueden ser array o string
  private static extractClaims(decoded: any, claimType: string): string[] {
    const claim = decoded[claimType];
    if (!claim) return [];
    return Array.isArray(claim) ? claim : [claim];
  }

  // Obtener tiempo de expiración del token
  static getTokenExpiration(token: string): Date | null {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) {
        return null;
      }
      return new Date(decoded.exp * 1000);
    } catch (error) {
      return null;
    }
  }

  // Verificar si el usuario tiene un rol específico
  static hasRole(token: string, role: string): boolean {
    const claims = this.readJWTProperties(token);
    if (!claims) return false;
    return claims.roles.includes(role);
  }

  // Verificar si el usuario tiene un permiso específico
  static hasPermission(token: string, permission: string): boolean {
    const claims = this.readJWTProperties(token);
    if (!claims) return false;
    return claims.permissions.includes(permission);
  }
}
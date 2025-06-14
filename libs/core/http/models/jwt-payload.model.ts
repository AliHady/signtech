export interface JwtPayload {
  sub: string; // Subject (user ID)
  exp: number; // Expiration time
  iat: number; // Issued at
  roles?: string[]; // User roles
  [key: string]: any; // Additional claims
} 
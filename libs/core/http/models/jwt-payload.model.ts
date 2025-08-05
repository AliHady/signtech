export interface JwtPayload {
  sub: string; // Subject (user ID)
  exp: number; // Expiration time
  iat: number; // Issued at
  firstName: string; // User's first name
  lastName: string; // User's last name
  userId: string; // User ID
  roles?: string[]; // User roles
  [key: string]: any; // Additional claims
} 
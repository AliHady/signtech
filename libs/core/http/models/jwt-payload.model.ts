export interface JwtPayload {
  sub: string; // Subject (user ID)
  exp: number; // Expiration time
  iat: number; // Issued at
  firstName: string; // User's first name
  lastName: string; // User's last name
  userId: string; // User ID
  roleId: string; // User role ID
  [key: string]: any; // Additional claims
} 
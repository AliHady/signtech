import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private getStorage(): Storage | null {
    return isPlatformBrowser(this.platformId) ? localStorage : null;
  }

  getToken(): string | null {
    return this.getStorage()?.getItem(this.TOKEN_KEY) ?? null;
  }

  setToken(token: string): void {
    this.getStorage()?.setItem(this.TOKEN_KEY, token);
  }

  removeTokens(): void {
    const storage = this.getStorage();
    if (storage) {
      storage.removeItem(this.TOKEN_KEY);
    }
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return true;
    return Date.now() >= payload.exp * 1000;
  }

  handleUnauthorized(): void {
    this.removeTokens();
  }
} 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/api/auth/login', credentials)
      .pipe(
        tap(response => {
          this.tokenService.setToken(response.token);
          this.tokenService.setRefreshToken(response.refreshToken);
        })
      );
  }

  logout(): void {
    this.tokenService.removeTokens();
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.http
      .post<AuthResponse>('/api/auth/refresh', { refreshToken })
      .pipe(
        tap(response => {
          this.tokenService.setToken(response.token);
          this.tokenService.setRefreshToken(response.refreshToken);
        })
      );
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return !!token && !this.tokenService.isTokenExpired(token);
  }

  getCurrentUser(): string | null {
    const token = this.tokenService.getToken();
    if (!token) return null;
    
    const payload = this.tokenService.decodeToken(token);
    return payload?.sub || null;
  }
} 
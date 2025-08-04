import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from 'apps/support-link/src/environments/environment';

export interface AuthResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  loadingRoles = new BehaviorSubject<boolean>(false);
  rolesError = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  /**
 * Request OTP by email.
 * Calls the backend to send an OTP to the user's email.
 */
  requestOtp(email: string, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'X-Recaptcha-Token': token });
    return this.http.post<any>(
      `${environment.contentUrl}/customer/request-otp`,
      { headers: headers, Email: email }
    );
  }

  /**
   * Verify OTP and get authentication tokens.
   * Calls the backend to verify the OTP and returns tokens.
   */
  verifyOtp(email: string, otp: string, token: any): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'X-Recaptcha-Token': token });
    return this.http.post<AuthResponse>(
      `${environment.contentUrl}/customer/verify-otp`,
      { headers: headers, Email: email, Otp: otp }
    ).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
      })
    );
  }

  logout(): void {
    this.tokenService.removeTokens();
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

  setLoggedIn(status: boolean) {
    this.isLoggedIn$.next(status);
  }
} 
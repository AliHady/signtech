import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from 'apps/support-link/src/environments/environment';
import { JwtPayload } from '../models/jwt-payload.model';
import { ApiDataService } from '@support-link/shared/utils';

export interface AuthResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private tokenService: TokenService,
    private apiDataService: ApiDataService) {
    this.isLoggedIn$.next(this.isAuthenticated());
  }

  /**
 * Request OTP by email.
 * Calls the backend to send an OTP to the user's email.
 */
  requestOtp(email: string, token: any): Observable<any> {
    return this.apiDataService.submitForm(
      `${environment.apiUrl}/customer/request-otp`,
      { Email: email },
      token
    );
  }

  /**
   * Verify OTP and get authentication tokens.
   * Calls the backend to verify the OTP and returns tokens.
   */
  verifyOtp(email: string, otp: string, token: any): Observable<AuthResponse> {
    return this.apiDataService.submitForm(
      `${environment.apiUrl}/customer/verify-otp`,
      { Email: email, Otp: otp },
      token
    );
  }

  /**
* Request OTP by email.
* Calls the backend to send an OTP to the user's email.
*/
  sendOtpUpdateProfile(data: FormData, token: any): Observable<any> {
    return this.apiDataService.submitFormData(
      `${environment.apiUrl}/customer/send-otp-update-profile`,
      data,
      token
    );
  }

  /**
   * Verify OTP and get authentication tokens.
   * Calls the backend to verify the OTP and returns tokens.
   */
  verifyOtpUpdateProfile(email: string, otp: string, token: any): Observable<AuthResponse> {
    return this.apiDataService.submitForm(
      `${environment.apiUrl}/customer/verify-otp-update-profile`,
      { Email: email, Otp: otp },
      token
    );
  }

  logout(): void {
    this.tokenService.removeTokens();
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return !!token && !this.tokenService.isTokenExpired(token);
  }

  getCurrentUser(): JwtPayload | null {
    const token = this.tokenService.getToken();
    if (!token) return null;

    const payload = this.tokenService.decodeToken(token);
    return payload || null;
  }

  setLoggedIn(status: boolean) {
    this.isLoggedIn$.next(status);
  }


  getCurrentUserSync(): JwtPayload | null {
    return this.getCurrentUser();
  }

  getUserRole(): string {
    const user: JwtPayload | null = this.getCurrentUserSync();
    if (!user) return '';
    return `${user.roleId}`.trim();
  }

  getFullName(): string {
    const user: JwtPayload | null = this.getCurrentUserSync();
    if (!user) return '';
    const first = user.firstName || '';
    const last = user.lastName || '';
    return `${first} ${last}`.trim();
  }

  async getUserId(): Promise<string> {
    const user: JwtPayload | null = await this.getCurrentUserSync();
    return user?.sub || '';
  }
} 
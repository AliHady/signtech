import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
  private userRoles$ = new BehaviorSubject<string[]>([]);
  loadingRoles = new BehaviorSubject<boolean>(false);
  rolesError = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private apiDataService: ApiDataService) {
    this.isLoggedIn$.next(this.isAuthenticated());
  }

  /**
 * Request OTP by email.
 * Calls the backend to send an OTP to the user's email.
 */
  requestOtp(email: string, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'X-Recaptcha-Token': token });
    return this.http.post<any>(
      `${environment.apiUrl}/customer/request-otp`,
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
      `${environment.apiUrl}/customer/verify-otp`,
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

  getRoles(): string[] {
    return this.userRoles$.value;
  }

  getRoles$(): Observable<string[]> {
    return this.userRoles$.asObservable();
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

  fetchUserRoles(): void {
    if (this.loadingRoles.value) return;
    this.loadingRoles.next(true);
    this.apiDataService.getData<string[]>(`${environment.apiUrl}/roles/user`, undefined, undefined, false)
      .pipe(
        tap(roles => {
          this.userRoles$.next(roles || []);
          this.loadingRoles.next(false);
          this.rolesError.next(null);
        }),
        catchError((e) => {
          console.log(e);
          this.userRoles$.next([]);
          this.loadingRoles.next(false);
          this.rolesError.next('Failed to load roles');
          return of([]);
        })
      ).subscribe();
  }
} 
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
   return true;
    if (this.authService.isAuthenticated()) {
      return true;
    }

     this.redirectToLogin(state.url);
    return false;
  }

  private redirectToLogin(url: string) {
    const urlSegments = url.split('/');
    const lang = urlSegments[1] || 'ar';
    this.router.navigate([`/${lang}/auth/login`], { queryParams: { returnUrl: url } });
  }
} 
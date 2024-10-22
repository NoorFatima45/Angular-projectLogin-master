import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  
  // Use inject to get instances of required services
  const authService = inject(AuthService);
  const router = inject(Router);

  // Add your authentication logic here
  if (authService.isLoggedin()) {
    return true;  // Allow navigation if the user is logged in
  } else {
    // Redirect to the login page if the user is not authenticated
    return router.createUrlTree(['/login']);
  }
  
};

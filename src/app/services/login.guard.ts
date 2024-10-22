import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const loginGuard: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in
  if (authService.isLoggedin()) {
    // If logged in, redirect to the home page
    return router.createUrlTree(['/home']);
  } else {
    // If not logged in, allow access to the login page
    return true;
  }
};

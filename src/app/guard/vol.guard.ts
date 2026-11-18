import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

// Guard : oblige l'utilisateur a etre connecte pour naviguer
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isloggedIn)
    return true;
  else
    return router.createUrlTree(['/login']);
};

// Guard : oblige l'utilisateur a etre connecte ET ADMIN
export const volGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Pas connecte => page de login
  if (!authService.isloggedIn)
    return router.createUrlTree(['/login']);

  // Connecte mais pas ADMIN => page "non autorise"
  if (authService.isAdmin())
    return true;
  else
    return router.createUrlTree(['/app-forbidden']);
};

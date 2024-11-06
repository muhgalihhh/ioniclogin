import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const autoLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.authenticationState.pipe(
    filter((val) => val !== null),
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigateByUrl('/home', { replaceUrl: true });
        return true;
      } else {
        return true;
      }
    })
  );
};

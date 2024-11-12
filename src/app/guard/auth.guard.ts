import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map(user => !!user),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
      }
    })
  );
};

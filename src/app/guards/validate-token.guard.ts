import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this._authService.validateToken()
      .pipe(
        tap( valid => {
          if(!valid) {
            this._router.navigateByUrl('/auth');
          }
        })
      );
  }
  canLoad(): Observable<boolean> | boolean {
    return this._authService.validateToken()
      .pipe(
        tap( valid => {
          if(!valid) {
            this._router.navigateByUrl('/auth');
          }
        })
      );
  }
}

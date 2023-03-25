import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate, CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {

    const token = localStorage.getItem('token') || '';

    if(token === '') {
      return true;
    }

    return this._authService.validateToken()
      .pipe(
        tap( valid => {
          if(valid) {
            this._router.navigateByUrl('/dashboard');
          }
        }),
        map( valid => true ),
      );
  }
  canLoad(): Observable<boolean> | boolean {
    
    const token = localStorage.getItem('token') || '';

    if(token === '') {
      return true;
    }

    return this._authService.validateToken()
      .pipe(
        tap( valid => {
          if(valid) {
            this._router.navigateByUrl('/dashboard');
          }
        }),
        map( valid => true ),
      );
  }
}

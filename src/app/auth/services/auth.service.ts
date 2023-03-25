import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(
    private _http: HttpClient
  ) { }

  register(name: string, email: string, password: string) {
    const url = `${ this._baseUrl }/auth/new`;
    const body = { name, email, password };
    return this._http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok) {
            localStorage.setItem('token', resp.token!);
          }
        }),
        map( valid => valid.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  login( email: string, password: string ) {
    const url = `${ this._baseUrl }/auth`;
    const body = { email, password };
    return this._http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok) {
            localStorage.setItem('token', resp.token!);
          }
        }),
        map( valid => valid.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  validateToken(): Observable<boolean> {
    const url = `${this._baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this._http.get<AuthResponse>( url, {headers} )
      .pipe(
        map( resp => {

          localStorage.setItem('token', resp.token!);
          this._user = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }

          return resp.ok;
        }),
        catchError( err => of(false) )
      );
  }

  logout() {
    localStorage.clear();
  }
}

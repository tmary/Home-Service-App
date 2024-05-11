import { Injectable } from '@angular/core';
import { User, TokenResponse, TokenPayload } from '../model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { UserRole } from '../shared/user-role.enum';
import { Router } from '@angular/router';
import {map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserRole: UserRole| null = null;


  constructor(private http: HttpClient, private router: Router) { }

   // login
   login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post('http://localhost:3000/app/login', body, {headers: headers, withCredentials: true});
  }

  register(user: User): Observable<any> {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('firstName', user.firstName);
    body.set('address', user.address);
    body.set('lastName', user.lastName);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:3000/app/register', body, {headers: headers});
  }

  logout(): Observable<any> {
    this.currentUserRole = null;
    return this.http.post('http://localhost:3000/app/logout', {} ,{withCredentials: true, responseType: 'text'});
  }

  checkAuth(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:3000/app/checkAuth', {withCredentials: true});
  }


  setCurrentUserRole(role: UserRole | null): void {
    this.currentUserRole = role;
  }

  getCurrentUserRole(): UserRole | null {
    return this.currentUserRole;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserRole;
  }

  isServiceProvider(): boolean {
    return this.currentUserRole === UserRole.ServiceProvider;
  }

  isUser(): boolean {
    return this.currentUserRole === UserRole.User;
  }

  isAdmin(): boolean {
    return this.currentUserRole === UserRole.Admin;
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:5000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
          this.setUserRole(response.token.user.role);
          console.log('Token received:', response.token)
        }
      })
    );
  }

  setToken(token: string): void {
    console.log('Setting token:', token);
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUserRole(role: string): void {
    console.log('Setting user role:', role);  
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string | null {
    const role = localStorage.getItem('userRole');
    console.log('Getting user role:', role);  
    return role;

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  navigateBasedOnUserRole(): void {
    const userRole = this.getUserRole();
    console.log('User role:', userRole);
    switch(userRole) {
      case 'functionalLead':
        this.router.navigate(['functional-lead-dashboard']);
        break;
      case 'employee':
        this.router.navigate(['employee-dashboard']);
        break;
      case 'executive':
        this.router.navigate(['executive-dashboard']);
        break;
      default:
        this.router.navigate(['login']);
    }
  }
}

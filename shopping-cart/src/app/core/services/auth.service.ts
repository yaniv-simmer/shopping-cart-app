import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(tap(() => {
      localStorage.setItem('loggedInUser', JSON.stringify({ email }));
    }));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }
}

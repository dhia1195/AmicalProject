import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private _http: HttpClient) {}

  // Signup Method
  signup(email: string, password: string, username: string): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/signup`, { email, password, username });
  }

  // Signin Method
  signin(email: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/signin`, { email, password });
  }
}

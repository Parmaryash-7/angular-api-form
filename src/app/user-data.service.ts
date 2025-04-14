import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserDetails } from './user-details';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private base_url = environment.API_URL
  usersList: UserDetails[] = [];

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  getAllUsers(): Observable<any> {
    const apiUrl = `${this.base_url}/getUsers`;
    return this.http.get(apiUrl);
  }

  getUser(id: string): Observable<any> {
    const apiUrl = `${this.base_url}/details`;
    return this.http.post(apiUrl, { id });
  }

  createUser(userData: any): Observable<any> {
    const apiUrl = `${this.base_url}/registerUser`;
    return this.http.post(apiUrl, userData);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const apiUrl = `${this.base_url}/login`
    return this.http.post(apiUrl, body);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  generateId(name: string): Observable<any> {
    return this.http.get(`${BASE_URL}/users/getId/${name}`, {
      responseType: 'text',
    });
  }

  setUserIdLocal(userId: string) {
    localStorage.setItem('userId', userId);
  }


  removeUserIdLocal() {
    localStorage.removeItem('userId');
  }

  getUserIdLocal(): string | null {
    return localStorage.getItem('userId');
  }

  inviteUserById(userId: string): Observable<any> {
    return this.http.post(`${BASE_URL}/users/invite`, { id: userId });
  }
}

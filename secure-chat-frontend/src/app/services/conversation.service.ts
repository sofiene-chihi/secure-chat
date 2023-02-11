import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  getUserConversations(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${BASE_URL}/conversation/user/${userId}`);
  }

  getConversationMessages(conversationId: string) {
    return this.http.get<string[]>(
      `${BASE_URL}/conversation/messages/${conversationId}`
    );
  }
}

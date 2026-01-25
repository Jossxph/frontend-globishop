import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatResponse {
  text: string;
  type: 'text' | 'product_list';
  data?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/chatbot/ask';

  sendMessage(question: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, { question });
  }
}
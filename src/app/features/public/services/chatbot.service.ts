import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../../core/api/api-routes';

// # DEFINE EL FORMATO DE RESPUESTA DEL BOT
export interface ChatResponse {
  reply?: string;
  response?: string;
  message?: string;
  text?: string;
  type?: 'text' | 'product_list' | 'login_required' | 'navigate';
  data?: any[];
  route?: string;
  actionLabel?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private http = inject(HttpClient);

  // # ENVIA EL MENSAJE DEL USUARIO AL BACKEND
  sendMessage(message: string): Observable<ChatResponse> {
    // EL BACKEND ESPERA UN OBJETO CON LA LLAVE 'message'
    return this.http.post<ChatResponse>(API_ROUTES.chatbot.ask, { message });
  }
}

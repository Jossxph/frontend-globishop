import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// # DEFINE EL FORMATO DE RESPUESTA DEL BOT (TEXTO NORMAL O SUGERENCIA DE PRODUCTOS)
export interface ChatResponse {
  text: string;
  type: 'text' | 'product_list';
  data?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  // # INYECCION DEL CLIENTE HTTP
  private http = inject(HttpClient);

  // # URL DEL CONTROLADOR EN SPRING BOOT QUE PROCESA LA PREGUNTA
  private apiUrl = 'http://localhost:8080/api/chatbot/ask';

  // # ENVIA EL TEXTO DEL USUARIO AL BACKEND Y ESPERA LA RESPUESTA ESTRUCTURADA
  sendMessage(question: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, { question });
  }
}
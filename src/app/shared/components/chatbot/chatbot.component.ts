import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChatbotService, ChatResponse } from '../../../features/public/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chatbot.html'
})
export class ChatbotComponent implements AfterViewChecked {
  private chatbotService = inject(ChatbotService);
  private router = inject(Router);
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  isOpen = false;
  userInput = '';
  isTyping = false;
  messages: any[] = [];

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) setTimeout(() => this.scrollToBottom(), 100);
  }

  quickAsk(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const question = this.userInput;
    this.messages.push({ from: 'user', text: question });
    this.userInput = '';
    this.isTyping = true;
    this.scrollToBottom();

    this.chatbotService.sendMessage(question).subscribe({
      next: (res: ChatResponse) => {
        setTimeout(() => {
          this.isTyping = false;
          // SE EXTRAE EL TEXTO DE CUALQUIERA DE LAS POSIBLES LLAVES QUE DEVUELVA EL BACKEND
          const botText = res.reply || res.response || res.message || res.text || 'Sin respuesta';

          this.messages.push({
            from: 'bot',
            text: botText,
            type: res.type || 'text',
            data: res.data,
            route: res.route,
            actionLabel: res.actionLabel
          });
          if (res.type === 'navigate' && res.route) {
            this.isOpen = false;
            this.router.navigateByUrl(res.route);
          }
          this.scrollToBottom();
        }, 500);
      },
      error: () => {
        this.isTyping = false;
        this.messages.push({ from: 'bot', text: 'Lo siento, tuve un error de conexión. 🔌' });
        this.scrollToBottom();
      }
    });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}

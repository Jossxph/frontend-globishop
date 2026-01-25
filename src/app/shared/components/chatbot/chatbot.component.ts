import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatbotService, ChatResponse } from '../../../core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <button (click)="toggleChat()" 
            class="w-14 h-14 bg-primary hover:bg-secondary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 relative group z-[60]">
      <i *ngIf="!isOpen" class="ri-robot-2-line text-2xl animate-bounce-slow"></i>
      <i *ngIf="isOpen" class="ri-close-line text-2xl"></i>
      
      <span *ngIf="!isOpen" class="absolute right-16 bg-card border border-theme text-main text-xs font-bold px-3 py-1.5 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
         ¿Te ayudo?
      </span>
    </button>

    <div *ngIf="isOpen" class="fixed bottom-24 right-5 w-[360px] h-[550px] bg-card border border-theme rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up z-[60]">
      
      <div class="bg-primary p-4 flex items-center gap-3 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
        
        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
          <i class="ri-robot-2-fill text-white text-xl"></i>
        </div>
        <div>
          <h3 class="text-white font-black text-sm tracking-wide">GlobiBot AI</h3>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(74,222,128,0.8)]"></span>
            <span class="text-white/90 text-xs font-medium">En línea</span>
          </div>
        </div>
        
        <button (click)="toggleChat()" class="ml-auto text-white/70 hover:text-white transition-colors">
          <i class="ri-arrow-down-s-line text-xl"></i>
        </button>
      </div>

      <div #scrollMe class="flex-1 overflow-y-auto p-4 space-y-4 bg-main scroll-smooth">
        
        <div class="flex gap-3 justify-start animate-fade-in">
           <div class="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
             <i class="ri-robot-line text-primary text-xs"></i>
           </div>
           <div class="bg-input border border-theme p-3.5 rounded-2xl rounded-tl-none text-sm text-main shadow-sm max-w-[85%] leading-relaxed">
             <p>¡Hola! 👋 Soy el asistente virtual de GlobiShop. ¿En qué puedo ayudarte hoy?</p>
             <div class="mt-3 flex flex-wrap gap-2">
               <button (click)="quickAsk('Buscar laptop')" class="text-xs bg-card border border-theme px-2 py-1 rounded-lg hover:border-primary hover:text-primary transition-colors cursor-pointer">🔍 Buscar laptop</button>
               <button (click)="quickAsk('Mis pedidos')" class="text-xs bg-card border border-theme px-2 py-1 rounded-lg hover:border-primary hover:text-primary transition-colors cursor-pointer">📦 Mis pedidos</button>
             </div>
           </div>
        </div>

        <div *ngFor="let msg of messages" class="flex gap-3 animate-fade-in" [ngClass]="{'justify-end': msg.from === 'user', 'justify-start': msg.from === 'bot'}">
           
           <div *ngIf="msg.from === 'bot'" class="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
             <i class="ri-robot-line text-primary text-xs"></i>
           </div>

           <div class="p-3.5 rounded-2xl text-sm max-w-[85%] shadow-sm leading-relaxed"
                [ngClass]="{
                  'bg-primary text-white rounded-tr-none': msg.from === 'user',
                  'bg-input border border-theme text-main rounded-tl-none': msg.from === 'bot'
                }">
             
             <p>{{ msg.text }}</p>

             <div *ngIf="msg.type === 'product_list'" class="mt-3 space-y-2">
                <div *ngFor="let prod of msg.data" 
                     [routerLink]="['/products', prod.productoId]"
                     class="bg-card p-2 rounded-xl border border-theme flex gap-3 items-center cursor-pointer hover:border-primary/50 transition-all group">
                   
                   <div class="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
                     <img [src]="prod.imagenUrl || 'https://via.placeholder.com/40'" class="max-h-full object-contain">
                   </div>
                   
                   <div class="overflow-hidden min-w-0">
                      <p class="font-bold text-main truncate text-xs group-hover:text-primary transition-colors">{{ prod.nombre }}</p>
                      <p class="text-primary font-black text-xs">S/ {{ prod.precio }}</p>
                   </div>
                   
                   <i class="ri-arrow-right-s-line text-muted ml-auto"></i>
                </div>
             </div>

             <div *ngIf="msg.type === 'login_required'" class="mt-3">
    <button routerLink="/login" 
            (click)="isOpen = false"
            class="w-full bg-card border border-theme hover:border-primary text-primary font-bold py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs shadow-sm">
       <i class="ri-login-circle-line text-lg"></i>
       Iniciar Sesión / Registrarse
    </button>
    <p class="text-[10px] text-muted mt-2 text-center">Es gratis y rápido.</p>
  </div>

                </div>  
           
           <div *ngIf="msg.from === 'user'" class="w-8 h-8 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 mt-1">
             <i class="ri-user-smile-line text-secondary text-xs"></i>
           </div>
        </div>

        <div *ngIf="isTyping" class="flex gap-3 justify-start animate-fade-in">
           <div class="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
             <i class="ri-more-fill text-primary text-xs"></i>
           </div>
           <div class="bg-input border border-theme px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
             <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
             <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
             <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
           </div>
        </div>
      </div>

      <div class="p-3 bg-card border-t border-theme flex gap-2 items-center">
        <input [(ngModel)]="userInput" (keyup.enter)="sendMessage()" 
               type="text" placeholder="Escribe tu duda..." 
               class="flex-1 bg-input text-main rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary border border-theme transition-all placeholder:text-muted/60">
        
        <button (click)="sendMessage()" [disabled]="!userInput.trim() || isTyping" 
                class="w-11 h-11 bg-primary hover:bg-secondary text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20 active:scale-95">
          <i class="ri-send-plane-fill text-lg"></i>
        </button>
      </div>

    </div>
  `

})
export class ChatbotComponent implements AfterViewChecked {
  private chatbotService = inject(ChatbotService);
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
      next: (res) => {
        setTimeout(() => {
          this.isTyping = false;
          this.messages.push({
            from: 'bot',
            text: res.text,
            type: res.type,
            data: res.data
          });
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
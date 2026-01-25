import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CartSidebarComponent } from './shared/components/cart-sidebar/cart-sidebar.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatbotComponent, CartSidebarComponent],
  template: `
    <router-outlet></router-outlet>

    <app-cart-sidebar></app-cart-sidebar>

    <div *ngIf="showChatbot" class="fixed bottom-5 right-5 z-50 animate-fade-in">
        <app-chatbot></app-chatbot>
    </div>
  `
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  showChatbot = false;

  showAlways = true;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkVisibility(event.urlAfterRedirects);
    });
  }

  private checkVisibility(url: string) {

    if (this.showAlways) {
      this.showChatbot = true;
      return;
    }

    const blackList = ['/login', '/register', '/forgot-password', '/not-found', '/auth'];
    const isBlacklisted = blackList.some(path => url.includes(path));

    this.showChatbot = !isBlacklisted;
  }
}
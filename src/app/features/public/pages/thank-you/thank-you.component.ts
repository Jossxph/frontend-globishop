import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './thank-you.html',
  styles: [`
    .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .animate-pulse-slow { animation: pulse 3s infinite; }

    @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }
  `]
})
export class ThankYouComponent implements OnInit {
  private route = inject(ActivatedRoute);
  orderId: string | null = null;

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (!this.orderId) {
      this.orderId = Math.floor(100000 + Math.random() * 900000).toString();
    }
  }
}
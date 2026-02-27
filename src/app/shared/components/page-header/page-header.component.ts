import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.html',
  styles: [`
    .animate-scale-slow { animation: scaleSlow 20s infinite alternate; }
    @keyframes scaleSlow { from { transform: scale(1); } to { transform: scale(1.1); } }
  `]
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() bgImage: string = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa';
}
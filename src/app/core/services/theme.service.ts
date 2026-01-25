import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDark = signal<boolean>(true);

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.isDark.set(saved === 'dark');
    } else {
      this.isDark.set(true);
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark.update(val => !val);
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    const html = document.documentElement;
    if (this.isDark()) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
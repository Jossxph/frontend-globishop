import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProfileService } from '../../core/services/profile.service';

// Componentes Hijos
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterLink,
    OrderHistoryComponent,
    FavoritesComponent,
    MyReviewsComponent,
    ProfileSettingsComponent
  ],
  template: `
    <app-navbar></app-navbar>

    <div class="container mx-auto px-4 py-24 md:py-28 max-w-7xl animate-fade-in">
      
      <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        
        <aside class="bg-card border border-theme rounded-3xl p-6 shadow-sm sticky top-24 z-10">
            
            <div class="flex flex-col items-center text-center mb-6">
                <div class="relative w-24 h-24 mb-3 group cursor-pointer">
                    <div class="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <img *ngIf="user?.fotoUrl" [src]="user.fotoUrl" class="w-full h-full rounded-full object-cover border-4 border-card relative z-10">
                    <div *ngIf="!user?.fotoUrl" class="w-full h-full rounded-full bg-input border-4 border-card flex items-center justify-center text-3xl font-bold text-primary relative z-10">
                        {{ user?.nombre?.charAt(0) || 'U' }}
                    </div>
                    <div class="absolute bottom-0 right-0 z-20 bg-main border border-theme text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                       <i class="ri-medal-line text-yellow-500"></i> {{ user?.nivelActual || 'Bronce' }}
                    </div>
                </div>
                
                <h2 class="text-xl font-black text-main leading-tight">{{ user?.nombre }}</h2>
                <p class="text-xs text-muted font-medium mb-3">{{ user?.email }}</p>

                <div class="w-full bg-input rounded-full h-2 overflow-hidden mb-1">
                    <div class="bg-primary h-full rounded-full transition-all duration-1000" [style.width.%]="user?.barraProgreso || 0"></div>
                </div>
                <div class="flex justify-between w-full text-[10px] font-bold text-muted uppercase tracking-wider">
                    <span>XP</span>
                    <span>{{ user?.barraProgreso | number:'1.0-0' }}%</span>
                </div>
            </div>

            <hr class="border-theme mb-6">

            <nav class="space-y-1">
                <button *ngFor="let tab of tabs" 
                    (click)="activeTab = tab.id"
                    [class.bg-primary]="activeTab === tab.id"
                    [class.text-white]="activeTab === tab.id"
                    [class.shadow-lg]="activeTab === tab.id"
                    [class.shadow-primary-30]="activeTab === tab.id"
                    [class.text-muted]="activeTab !== tab.id"
                    [class.hover:bg-input]="activeTab !== tab.id"
                    class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-left group">
                    
                    <i [class]="tab.icon" class="text-lg transition-colors" [class.text-white]="activeTab === tab.id" [class.group-hover:text-main]="activeTab !== tab.id"></i>
                    <span [class.group-hover:text-main]="activeTab !== tab.id">{{ tab.label }}</span>
                    
                    <i *ngIf="activeTab === tab.id" class="ri-arrow-right-s-line ml-auto"></i>
                </button>
            </nav>

        </aside>


        <main class="min-h-[500px]">
            
            <div class="mb-6 hidden lg:block">
                <h1 class="text-2xl font-black text-main">{{ getActiveTabLabel() }}</h1>
                <p class="text-sm text-muted">Gestiona tu información y actividad.</p>
            </div>

            <div [ngSwitch]="activeTab" class="animate-fade-in-up">
                
                <app-order-history *ngSwitchCase="'resumen'"></app-order-history>
                
                <app-favorites *ngSwitchCase="'favoritos'"></app-favorites>
                
                <app-my-reviews *ngSwitchCase="'resenas'"></app-my-reviews>
                
                <app-profile-settings *ngSwitchCase="'config'" 
                                      [user]="user" 
                                      (profileUpdated)="loadProfile()">
                </app-profile-settings>

            </div>
        </main>

      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  user: any = null;
  activeTab = 'resumen';

  tabs = [
    { id: 'resumen', label: 'Mis Pedidos', icon: 'ri-file-list-3-line' },
    { id: 'favoritos', label: 'Lista de Deseos', icon: 'ri-heart-line' },
    { id: 'resenas', label: 'Mis Reseñas', icon: 'ri-chat-quote-line' },
    { id: 'config', label: 'Configuración', icon: 'ri-settings-4-line' }
  ];

  ngOnInit() {
    this.loadProfile();

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
  }

  loadProfile() {
    this.profileService.getProfile().subscribe(data => {
      this.user = data;
    });
  }

  getActiveTabLabel() {
    return this.tabs.find(t => t.id === this.activeTab)?.label;
  }
}
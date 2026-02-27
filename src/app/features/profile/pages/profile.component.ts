import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProfileService } from '../services/profile.service';

// Componentes Hijos
// Componentes Hijos
import { OrderHistoryComponent } from '../components/order-history/order-history.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { MyReviewsComponent } from '../components/my-reviews/my-reviews.component';
import { ProfileSettingsComponent } from '../components/profile-settings/profile-settings.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    OrderHistoryComponent,
    FavoritesComponent,
    MyReviewsComponent,
    ProfileSettingsComponent
  ],
  templateUrl: './profile.html'
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
    this.profileService.getProfile().subscribe((data: any) => {
      this.user = data;
    });
  }

  getActiveTabLabel() {
    return this.tabs.find(t => t.id === this.activeTab)?.label;
  }
}
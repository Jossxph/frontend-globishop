import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'products', component: AdminProductsComponent },
            { path: 'orders', component: AdminOrdersComponent },
            { path: 'users', component: AdminUsersComponent },
            { path: 'categories', component: AdminCategoriesComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

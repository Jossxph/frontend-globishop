import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: AdminDashboardComponent
            },
            {
                path: 'products',
                component: AdminProductsComponent
            },
            {
                path: 'orders',
                component: AdminOrdersComponent
            },
            {
                path: 'users',
                component: AdminUsersComponent
            },
            {
                path: 'categories',
                component: AdminCategoriesComponent
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];
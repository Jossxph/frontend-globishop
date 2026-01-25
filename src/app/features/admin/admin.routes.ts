import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';

export const ADMIN_ROUTES: Routes = [
    {
        // RUTA BASE DEL MODULO DE ADMINISTRACION
        path: '',
        // ESTE COMPONENTE ES EL "PADRE" O SHELL (CONTIENE EL SIDEBAR Y EL HEADER FIJOS) :D
        component: AdminLayoutComponent,
        // LAS RUTAS HIJAS SE CARGARAN DENTRO DEL <ROUTER-OUTLET> DEL LAYOUT XD
        children: [
            {
                // RUTA: /admin/dashboard -> PANTALLA DE RESUMEN Y ESTADISTICAS
                path: 'dashboard',
                component: AdminDashboardComponent
            },
            {
                // RUTA: /admin/products -> CRUD DE PRODUCTOS
                path: 'products',
                component: AdminProductsComponent
            },
            {
                // RUTA: /admin/orders -> GESTION DE PEDIDOS DE CLIENTES
                path: 'orders',
                component: AdminOrdersComponent
            },
            {
                // RUTA: /admin/users -> CONTROL DE USUARIOS Y ROLES :V
                path: 'users',
                component: AdminUsersComponent
            },
            {
                // RUTA: /admin/categories -> GESTION DE CATEGORIAS
                path: 'categories',
                component: AdminCategoriesComponent
            },
            {
                // SI ALGUIEN ENTRA A "/admin" SIN NADA MAS, LO REDIRIGIMOS AL DASHBOARD
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];
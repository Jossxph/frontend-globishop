import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { APP_ROUTES } from './core/constants/app-routes';

// Importaciones de Layouts
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

// Importaciones de componentes
import { HomeComponent } from './features/public/pages/home/home.component';
import { ProductListComponent } from './features/product/pages/product-list/product-list.component';
import { ProductDetailComponent } from './features/product/pages/product-detail/product-detail.component';
import { CheckoutComponent } from './features/order/pages/checkout.component';
import { ProfileComponent } from './features/profile/pages/profile.component';
import { NotFoundComponent } from './features/public/pages/not-found/not-found.component';
import { AboutComponent } from './features/public/pages/about/about.component';
import { HelpComponent } from './features/public/pages/help/help.component';
import { ShippingComponent } from './features/public/pages/shipping/shipping.component';
import { ReturnsComponent } from './features/public/pages/returns/returns.component';
import { BlogComponent } from './features/public/pages/blog/blog.component';
import { WorkComponent } from './features/public/pages/work/work.component';
import { ThankYouComponent } from './features/public/pages/thank-you/thank-you.component';
// Los componentes legales se cargarán mediante Lazy Loading para evitar errores de ruteo


export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: APP_ROUTES.HOME, pathMatch: 'full' },
            { path: APP_ROUTES.HOME, component: HomeComponent },
            { path: APP_ROUTES.PRODUCTS, component: ProductListComponent },
            { path: APP_ROUTES.PRODUCT_DETAIL, component: ProductDetailComponent },

            { path: APP_ROUTES.CHECKOUT_SUCCESS + '/:id', component: ThankYouComponent },
            { path: APP_ROUTES.CHECKOUT_SUCCESS, component: ThankYouComponent },

            {
                path: APP_ROUTES.CHECKOUT,
                component: CheckoutComponent,
                canActivate: [authGuard]
            },
            {
                path: APP_ROUTES.PROFILE,
                component: ProfileComponent,
                canActivate: [authGuard]
            },

            { path: APP_ROUTES.ABOUT, component: AboutComponent },
            { path: APP_ROUTES.HELP, component: HelpComponent },
            { path: APP_ROUTES.SHIPPING, component: ShippingComponent },
            { path: APP_ROUTES.RETURNS, component: ReturnsComponent },
            { path: APP_ROUTES.BLOG, component: BlogComponent },
            { path: APP_ROUTES.WORK, component: WorkComponent },

            {
                path: APP_ROUTES.LEGAL_TERMS,
                loadComponent: () => import('./features/public/pages/legal/terms/terms.component').then(m => m.TermsComponent)
            },
            {
                path: APP_ROUTES.LEGAL_PRIVACY,
                loadComponent: () => import('./features/public/pages/legal/privacy/privacy.component').then(m => m.PrivacyComponent)
            },
            {
                path: APP_ROUTES.LEGAL_PROMOTIONS,
                loadComponent: () => import('./features/public/pages/legal/promotions/promotions.component').then(m => m.PromotionsComponent)
            },
            {
                path: APP_ROUTES.LEGAL_ACCESSIBILITY,
                loadComponent: () => import('./features/public/pages/legal/accessibility/accessibility.component').then(m => m.AccessibilityComponent)
            },
        ]
    },

    // RUTAS AUTH
    {
        path: APP_ROUTES.AUTH,
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },

    // RUTAS ADMIN
    {
        path: APP_ROUTES.ADMIN,
        canActivate: [adminGuard],
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },

    { path: APP_ROUTES.NOT_FOUND, component: NotFoundComponent },
    { path: '**', redirectTo: APP_ROUTES.NOT_FOUND }
];

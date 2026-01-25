import { Routes } from '@angular/router';
import { ProductListComponent } from './features/shop/product-list/product-list.component';
import { ProductDetailComponent } from './features/shop/product-detail/product-detail.component';
import { ProfileComponent } from './features/profile/profile.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { NotFoundComponent } from './features/public/not-found/not-found.component';
import { HomeComponent } from './features/public/home/home.component';
import { AboutComponent } from './features/public/about/about.component';
import { HelpComponent } from './features/public/help/help.component';
import { ShippingComponent } from './features/public/shipping/shipping.component';
import { ReturnsComponent } from './features/public/returns/returns.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { WorkComponent } from './features/public/work/work.component';
import { authGuard } from './core/guards/auth.guard';
import { TermsComponent } from './features/public/legal/terms/terms.component';
import { PrivacyComponent } from './features/public/legal/privacy/privacy.component';
import { PromotionsComponent } from './features/public/legal/promotions/promotions.component';
import { AccessibilityComponent } from './features/public/legal/accessibility/accessibility.component';
import { adminGuard } from './core/guards/admin.guard';
import { ThankYouComponent } from './features/public/thank-you/thank-you.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductListComponent },

    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'checkout/success/:id', component: ThankYouComponent },
    { path: 'checkout/success', component: ThankYouComponent },


    // RUTAS AUTH
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },

    // RUTAS PRIVADAS
    {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard]
    },

    // RUTAS PUBLICAS

    { path: 'about', component: AboutComponent },
    { path: 'help', component: HelpComponent },

    { path: 'shipping-info', component: ShippingComponent },
    { path: 'returns', component: ReturnsComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'work-with-us', component: WorkComponent },


    { path: 'legal/terms', component: TermsComponent },
    { path: 'legal/privacy', component: PrivacyComponent },
    { path: 'legal/promotions', component: PromotionsComponent },
    { path: 'legal/accessibility', component: AccessibilityComponent },


    // RUTAS ADMIN
    {
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },

    { path: '**', component: NotFoundComponent }
];


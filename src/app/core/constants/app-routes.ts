/**
 * APP_ROUTES — Constantes de navegación centralizada.
 * Usar en routerLink, router.navigate() y en la configuración de rutas.
 *
 * Ejemplo de uso:
 *   [routerLink]="['/' + APP_ROUTES.LOGIN]"
 *   this.router.navigate(['/' + APP_ROUTES.PROFILE])
 */
export const APP_ROUTES = {
    // ── Públicas ─────────────────────────────────────────────
    HOME: 'home',
    ABOUT: 'about',
    HELP: 'help',
    BLOG: 'blog',
    SHIPPING: 'shipping-info',
    RETURNS: 'returns',
    WORK: 'work-with-us',

    // ── Legal ────────────────────────────────────────────────
    LEGAL_TERMS: 'legal/terms',
    LEGAL_PRIVACY: 'legal/privacy',
    LEGAL_PROMOTIONS: 'legal/promotions',
    LEGAL_ACCESSIBILITY: 'legal/accessibility',

    // ── Auth ─────────────────────────────────────────────────
    AUTH: 'auth',
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    VERIFY: 'auth/verify',
    RECOVER_PASSWORD: 'auth/recover-password',

    // ── Tienda ───────────────────────────────────────────────
    PRODUCTS: 'products',
    PRODUCT_DETAIL: 'products/:id',

    // ── Privadas ─────────────────────────────────────────────
    CHECKOUT: 'checkout',
    CHECKOUT_SUCCESS: 'checkout/success',
    PROFILE: 'profile',
    NOT_FOUND: '**',

    // ── Admin ────────────────────────────────────────────────
    ADMIN: 'admin',
    ADMIN_DASHBOARD: 'admin/dashboard',
    ADMIN_PRODUCTS: 'admin/products',
    ADMIN_ORDERS: 'admin/orders',
    ADMIN_USERS: 'admin/users',
    ADMIN_CATEGORIES: 'admin/categories',
} as const;

export type AppRoute = typeof APP_ROUTES[keyof typeof APP_ROUTES];

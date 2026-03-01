import { environment } from '../../../environments/environment';

const AUTH    = environment.apiAuth;
const PRODUCT = environment.apiProduct;
const PEDIDO  = environment.apiPedido;
const NOTIF   = environment.apiNotificacion;

export const API_ROUTES = {
    auth: {
        login:           `${AUTH}/api/auth/login`,
        register:        `${AUTH}/api/auth/register`,
        verify:          `${AUTH}/api/auth/verify`,
        recoverPassword: `${AUTH}/api/auth/recover-password`,
        verifyCode:      `${AUTH}/api/auth/verify-code`,
        resetPassword:   `${AUTH}/api/auth/reset-password`,
    },
    profile: {
        me:                 `${AUTH}/api/profile`,
        orders:             `${AUTH}/api/profile/orders`,
        notifications:      `${AUTH}/api/profile/notifications`,
        favorites:          `${AUTH}/api/profile/favorites`,
        reviews:            `${AUTH}/api/profile/reviews`,
        changePassword:     `${AUTH}/api/profile/change-password`,
        requestEmailChange: `${AUTH}/api/profile/request-email-change`,
        confirmEmailChange: `${AUTH}/api/profile/confirm-email-change`,
        update:             `${AUTH}/api/profile/update`,
        delete:             `${AUTH}/api/profile/delete`,
    },
    products: {
        public: `${PRODUCT}/api/products`,
        admin:  `${PRODUCT}/api/admin/products`,
    },
    orders: {
        base:        `${PEDIDO}/api/orders`,
        checkoutBuy: `${PEDIDO}/api/checkout/buy`,
        admin:       `${PEDIDO}/api/admin/orders`,
    },
    reviews: {
        base: `${PRODUCT}/api/reviews`,
    },
    adminUsers: {
        base: `${AUTH}/api/admin/users`,
    },
    categories: {
        public: `${PRODUCT}/api/categorias`,
        admin:  `${PRODUCT}/api/admin/categories`,
    },
    admin: {
        stats:      `${PEDIDO}/api/admin/stats`,
        categories: `${PRODUCT}/api/admin/categories`,
    },
    chatbot: {
        ask: `${PRODUCT}/api/chatbot/ask`,
    },
    notifications: {
        base: `${NOTIF}/api/notifications`,
    },
    favoritos: {
        base: `${AUTH}/api/favoritos`,
    },
} as const;
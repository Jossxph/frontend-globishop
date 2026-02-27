import { environment } from '../../../environments/environment';

const API = environment.apiBaseUrl;

export const API_ROUTES = {
    auth: {
        login: `${API}/api/auth/login`,
        register: `${API}/api/auth/register`,
        verify: `${API}/api/auth/verify`,
        recoverPassword: `${API}/api/auth/recover-password`,
        verifyCode: `${API}/api/auth/verify-code`,
        resetPassword: `${API}/api/auth/reset-password`,
    },
    profile: {
        me: `${API}/api/profile`,
        orders: `${API}/api/profile/orders`,
        notifications: `${API}/api/profile/notifications`,
        favorites: `${API}/api/profile/favorites`,
        reviews: `${API}/api/profile/reviews`,
        changePassword: `${API}/api/profile/change-password`,
        requestEmailChange: `${API}/api/profile/request-email-change`,
        confirmEmailChange: `${API}/api/profile/confirm-email-change`,
        update: `${API}/api/profile/update`,
        delete: `${API}/api/profile/delete`,
    },
    products: {
        public: `${API}/api/products`,
        admin: `${API}/api/admin/products`,
    },
    orders: {
        orders: `${API}/api/orders`,
        checkoutBuy: `${API}/api/checkout/buy`,
        admin: `${API}/api/admin/orders`,
    },
    reviews: {
        base: `${API}/api/reviews`,
    },
    adminUsers: {
        base: `${API}/api/admin/users`,
    },
    categories: {
        public: `${API}/api/products/categories`,
    },
    admin: {
        stats: `${API}/api/admin/stats`,
        categories: `${API}/api/admin/categories`,
    },
    chatbot: {
        ask: `${API}/api/chatbot/ask`,
    },
} as const;

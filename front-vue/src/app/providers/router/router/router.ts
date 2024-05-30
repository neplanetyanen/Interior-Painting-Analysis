import { createRouter, createWebHistory } from 'vue-router';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage';

import { routes } from '../config/routes';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/signup', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

    if (authRequired && !loggedIn) {
        return next('/login');
    } else if (!authRequired && loggedIn) {
        return next('/create');
    }

    next();
});

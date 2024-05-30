import type { RouteRecordRaw } from 'vue-router';

import { HomePage } from '@/pages/HomePage';
import { LogInPage } from '@/pages/LogInPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { CreatePage } from '@/pages/CreatePage';
import { HistoryPage } from '@/pages/HistoryPage';
import { UserPage } from '@/pages/UserPage';
import {
    Routes,
    getRouteHome,
    getRouteLogIn,
    getRouteSignUp,
    getRouteCreatePage,
    getRouteHistoryPage,
    getRouteUserPage
} from '@/shared/consts/router';

export const routes: RouteRecordRaw[] = [
    {
        path: getRouteHome(),
        name: Routes.HOME,
        component: HomePage
    },
    {
        path: getRouteLogIn(),
        name: Routes.LOGIN,
        component: LogInPage
    },
    {
        path: getRouteSignUp(),
        name: Routes.SIGNUP,
        component: SignUpPage
    },
    {
        path: getRouteCreatePage(),
        name: Routes.CREATE,
        component: CreatePage
    },
    {
        path: getRouteHistoryPage(),
        name: Routes.HISTORY,
        component: HistoryPage
    },
    {
        path: getRouteUserPage(),
        name: Routes.USER,
        component: UserPage
    }
];

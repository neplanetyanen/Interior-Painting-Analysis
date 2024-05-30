export const Routes = {
    HOME: 'home',
    LOGIN: 'login',
    SIGNUP: 'signup',
    CREATE: 'create',
    HISTORY: 'history',
    USER: 'user'
} as const;

export type Route = ValueOf<typeof Routes>;

export const getRouteHome = () => '/';
export const getRouteLogIn = () => '/login';
export const getRouteSignUp = () => '/signup';
export const getRouteCreatePage = () => '/create';
export const getRouteHistoryPage = () => '/history';
export const getRouteUserPage = () => '/user';

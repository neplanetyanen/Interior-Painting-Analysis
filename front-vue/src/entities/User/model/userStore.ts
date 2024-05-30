import { type _GettersTree, defineStore } from 'pinia';

import { useCheckAuthApi, useLogoutApi } from '../api/requests';
import { type User } from './types/user';

import {
    USER_LOCAL_STORAGE_KEY,
    TOKEN_LOCAL_STORAGE_KEY,
    CREATE_PAINTINGS_LOCAL_STORAGE_KEY,
    CURRENT_HISTORY_PAINTINGS_LOCAL_STORAGE_KEY
} from '@/shared/consts/localStorage';
import { router } from '@/app/providers/router';
import { usePaintingsStore } from '@/entities/Paintings';

export const userNamespace = 'user';

export interface UserSchema {
    authData?: User;
}

export interface _UserGetterSchema extends _GettersTree<UserSchema> {}

export interface UserActionsSchema {
    setUser: (params: User) => void;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useUserStore = defineStore<
    string,
    UserSchema,
    _UserGetterSchema,
    UserActionsSchema
>(userNamespace, {
    state: (): UserSchema => ({
        authData: undefined
    }),
    actions: {
        setUser(user: User) {
            this.authData = user;
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
            localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, user.token);
        },
        async logout() {
            const paintingsStore = usePaintingsStore();
            this.authData = undefined;
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
            localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
            paintingsStore.resetPaintings();
            router.push('/');
        },
        async checkAuth() {
            const checkAuthApi = useCheckAuthApi();
            const response = await checkAuthApi.initiate();
            if (response) {
                this.authData = response;
            } else {
                this.authData = undefined;
                localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
            }
        }
    }
});

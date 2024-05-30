import { type _GettersTree, defineStore } from 'pinia';
import 'axios';
import { useLoginApi, useSignupApi } from '../api/requests';
import CryptoJS from 'crypto-js';
import { useUserStore } from '@/entities/User';
import { router } from '@/app/providers/router';
import { validationAuth } from '../lib/validators/validationHandler';

export const authFormNamespace = 'authForm';

export interface AuthFormSchema {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    error?: string;
}

export interface _AuthFormGetterSchema extends _GettersTree<AuthFormSchema> {}

export interface AuthFormActionsSchema {
    resetForm: () => void;
    signup: () => Promise<void>;
    login: () => Promise<void>;
}

export const useAuthFormStore = defineStore<
    string,
    AuthFormSchema,
    _AuthFormGetterSchema,
    AuthFormActionsSchema
>(authFormNamespace, {
    state: (): AuthFormSchema => ({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        error: undefined
    }),
    actions: {
        resetForm() {
            this.username = '';
            this.email = '';
            this.password = '';
            this.repeatPassword = '';
        },
        async signup() {
            this.error = undefined;
            const signupApi = useSignupApi();
            const response = await signupApi.initiate({
                username: this.username,
                password: CryptoJS.SHA256(this.password).toString()
            });
            if (response) {
                this.resetForm();
                router.push('/');
            } else {
                this.error = validationAuth(signupApi.error);
            }
        },
        async login() {
            this.error = undefined;
            const loginApi = useLoginApi();
            const response = await loginApi.initiate({
                username: this.username,
                password: CryptoJS.SHA256(this.password).toString()
            });
            if (response) {
                const userStore = useUserStore();
                userStore.setUser(response);
                this.resetForm();
                router.push('/create');
            } else {
                this.error = validationAuth(loginApi.error);
            }
        }
    }
});

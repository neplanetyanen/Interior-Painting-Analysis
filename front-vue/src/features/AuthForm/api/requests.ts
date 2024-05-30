import { type User } from '@/entities/User';
import { buildApi } from '@/shared/api/lib/useApi';

export const loginNamespace = 'login';
export const signupNamespace = 'signup';

export interface LoginRequestArgs {
    username: string;
    password: string;
}

export const useLoginApi = buildApi<User, LoginRequestArgs>(loginNamespace, {
    url: '/auth/login',
    method: 'POST',
    withCredentials: true
});

export interface SignupRequestArgs {
    username: string;
    password: string;
}

export const useSignupApi = buildApi<User, SignupRequestArgs>(signupNamespace, {
    url: '/auth/signup',
    method: 'POST',
    withCredentials: true
});

import { ref } from 'vue';

import { authValidationMessages } from './messages';

export const errorsFields = {
    username: ref(new Set<string>()),
    password: ref(new Set<string>()),
    repeatPassword: ref(new Set<string>())
};
export const errorsServer = ref<Set<string>>(new Set());

const validationUsername = (username: string) => {
    const regexp = /^[a-zA-Z0-9._-]+$/;
    if ((username.length > 30 || username.length < 5) && username !== '') {
        errorsFields.username.value.add(
            authValidationMessages.INVALID_LENGTH.USERNAME
        );
    } else {
        errorsFields.username.value.delete(
            authValidationMessages.INVALID_LENGTH.USERNAME
        );
    }
    if (!regexp.test(username) && username !== '') {
        errorsFields.username.value.add(
            authValidationMessages.REGEXP_MISMATCH.USERNAME
        );
    } else {
        errorsFields.username.value.delete(
            authValidationMessages.REGEXP_MISMATCH.USERNAME
        );
    }
};

const validationPassword = (password: string) => {
    const regexp = /^[a-zA-Z0-9.@_-]+$/;
    if (password.length < 8 && password !== '') {
        errorsFields.password.value.add(
            authValidationMessages.INVALID_LENGTH.PASSWORD
        );
    } else {
        errorsFields.password.value.delete(
            authValidationMessages.INVALID_LENGTH.PASSWORD
        );
    }
    if (!regexp.test(password) && password !== '') {
        errorsFields.password.value.add(
            authValidationMessages.REGEXP_MISMATCH.PASSWORD
        );
    } else {
        errorsFields.password.value.delete(
            authValidationMessages.REGEXP_MISMATCH.PASSWORD
        );
    }
};

const validationRepeatPassword = (repeatPassword: string, password: string) => {
    if (repeatPassword !== password) {
        errorsFields.repeatPassword.value.add(
            authValidationMessages.PASSWORDS_NOT_MATCH
        );
    } else {
        errorsFields.repeatPassword.value.delete(
            authValidationMessages.PASSWORDS_NOT_MATCH
        );
    }
};

export const validationAuthFields = (
    fieldName: string,
    value: string,
    repeatPassword?: string
) => {
    switch (fieldName) {
        case 'username':
            validationUsername(value);
            break;
        case 'password':
            validationPassword(value);
            break;
        case 'repeatPassword':
            if (repeatPassword !== undefined) {
                validationRepeatPassword(repeatPassword, value);
            }
            break;
        default:
            errorsServer.value.add(
                `Validation error in the field ${fieldName}`
            );
    }
};

export const validationAuth = (error: string | undefined) => {
    switch (error) {
        case 'USERNAME_ALREADY_EXISTS':
            return authValidationMessages.USERNAME_ALREADY_EXISTS;
        case 'EMAIL_ALREADY_EXISTS':
            return authValidationMessages.EMAIL_ALREADY_EXISTS;
        case 'USERNAME_NOT_FOUND':
            return authValidationMessages.USERNAME_NOT_FOUND;
        case 'INCORRECT_PASSWORD':
            return authValidationMessages.INCORRECT_PASSWORD;
        default:
            return error;
    }
};

export const validationAuthErrorClear = (field: string) => {
    switch (field) {
        case 'username':
            errorsServer.value.delete(
                authValidationMessages.USERNAME_ALREADY_EXISTS
            );
            errorsServer.value.delete(
                authValidationMessages.USERNAME_NOT_FOUND
            );
            break;
        case 'email':
            errorsServer.value.delete(
                authValidationMessages.EMAIL_ALREADY_EXISTS
            );
            break;
        case 'password':
            errorsServer.value.delete(
                authValidationMessages.INCORRECT_PASSWORD
            );
            break;
        case 'all':
            errorsServer.value.delete(
                authValidationMessages.USERNAME_ALREADY_EXISTS
            );
            errorsServer.value.delete(
                authValidationMessages.USERNAME_NOT_FOUND
            );
            errorsServer.value.delete(
                authValidationMessages.EMAIL_ALREADY_EXISTS
            );
            errorsServer.value.delete(
                authValidationMessages.INCORRECT_PASSWORD
            );
            break;
        default:
            break;
    }
};

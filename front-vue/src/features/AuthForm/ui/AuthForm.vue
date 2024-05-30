<script setup lang="ts">
import { ref, type PropType, computed } from 'vue';
import {
    errorsFields,
    validationAuthFields
} from '../lib/validators/validationHandler';
import { useAuthFormStore } from '../model/authFormStore';
import { loginContent, signupContent } from '../model/constans/authContent';
import { type AuthType } from '../model/types/authType';
import Eye from '@/shared/assets/icons/Eye.vue';
import ClosedEye from '@/shared/assets/icons/ClosedEye.vue';

import { Input, Column, Button, Typography } from '@/shared/ui';

const props = defineProps({
    type: {
        type: String as PropType<AuthType>,
        default: 'signup'
    }
});

const authFormStore = useAuthFormStore();

const authType = computed(() => props.type);
const isPasswordVisible = ref(false);
const isRepeatPasswordVisible = ref(false);
const authContent = computed(() =>
    authType.value === 'signup' ? signupContent : loginContent
);
const errorFieldUsername = computed(
    () => errorsFields.username.value.size !== 0
);
const errorFieldPassword = computed(
    () => errorsFields.password.value.size !== 0
);
const errorFieldRepeatPassword = computed(
    () => errorsFields.repeatPassword.value.size !== 0
);

const togglePasswordsVisibility = (passwordField: string) => {
    if (passwordField === 'password') {
        isPasswordVisible.value = !isPasswordVisible.value;
    } else {
        isRepeatPasswordVisible.value = !isRepeatPasswordVisible.value;
    }
};

const correctAuthChecker = computed(() => {
    if (authType.value === 'signup') {
        if (
            authFormStore.username === '' ||
            authFormStore.email === '' ||
            authFormStore.password === '' ||
            authFormStore.repeatPassword === '' ||
            errorsFields.username.value.size !== 0 ||
            errorsFields.password.value.size !== 0 ||
            errorsFields.repeatPassword.value.size !== 0
        ) {
            return true;
        } else {
            return false;
        }
    } else {
        if (
            authFormStore.username === '' ||
            authFormStore.password === '' ||
            errorsFields.username.value.size !== 0 ||
            errorsFields.password.value.size !== 0
        ) {
            return true;
        } else {
            return false;
        }
    }
});
const submitForm = () => {
    if (authType.value === 'signup') {
        authFormStore.signup();
    } else {
        authFormStore.login();
    }
};
</script>
<template>
    <Column :gap="'32'" full-width class="auth-form" :justify="'center'">
        <Typography :align="'center'" :size="'xl'">
            {{ $t(authContent.welcomeMsg) }}
        </Typography>
        <form @submit.prevent="submitForm">
            <Column :gap="'42'">
                <Column :gap="'32'" full-width>
                    <Column :gap="'4'" full-width :align="'start'">
                        <Input
                            v-model="authFormStore.username"
                            :placeholder="$t('message.usernameAuth')"
                            full-width
                            :borderError="errorFieldUsername"
                            @input="
                                validationAuthFields(
                                    'username',
                                    authFormStore.username
                                )
                            "
                        />
                        <template v-if="errorsFields.username.value.size !== 0">
                            <Typography
                                v-for="error in errorsFields.username.value"
                                :color="'error-msg'"
                                :size="'xs'"
                            >
                                {{ $t(error) }}
                            </Typography>
                        </template>
                    </Column>
                    <template v-if="authType === 'signup'">
                        <Input
                            v-model="authFormStore.email"
                            :placeholder="$t('message.emailAuth')"
                            :type="'email'"
                            full-width
                        />
                    </template>
                    <Column :gap="'4'" full-width :align="'start'">
                        <Input
                            v-model="authFormStore.password"
                            :placeholder="$t('message.passwordAuth')"
                            :type="isPasswordVisible ? 'text' : 'password'"
                            full-width
                            icon-shown
                            @icon-click="togglePasswordsVisibility('password')"
                            :borderError="errorFieldPassword"
                            @input="
                                validationAuthFields(
                                    'password',
                                    authFormStore.password
                                );
                                validationAuthFields(
                                    'repeatPassword',
                                    authFormStore.password,
                                    authFormStore.repeatPassword
                                );
                            "
                        >
                            <Eye v-if="isPasswordVisible === true" />
                            <ClosedEye v-if="isPasswordVisible === false" />
                        </Input>
                        <template v-if="errorsFields.password.value.size !== 0">
                            <Typography
                                v-for="error in errorsFields.password.value"
                                :color="'error-msg'"
                                :size="'xs'"
                            >
                                {{ $t(error) }}
                            </Typography>
                        </template>
                    </Column>
                    <template v-if="authType === 'signup'">
                        <Column :gap="'4'" full-width :align="'start'">
                            <Input
                                v-model="authFormStore.repeatPassword"
                                :placeholder="$t('message.repeatPasswordAuth')"
                                :type="
                                    isRepeatPasswordVisible
                                        ? 'text'
                                        : 'password'
                                "
                                full-width
                                icon-shown
                                @icon-click="
                                    togglePasswordsVisibility('repeatPassword')
                                "
                                :borderError="errorFieldRepeatPassword"
                                @input="
                                    validationAuthFields(
                                        'repeatPassword',
                                        authFormStore.password,
                                        authFormStore.repeatPassword
                                    )
                                "
                            >
                                <Eye v-if="isRepeatPasswordVisible === true" />
                                <ClosedEye
                                    v-if="isRepeatPasswordVisible === false"
                                />
                            </Input>
                            <template
                                v-if="
                                    errorsFields.repeatPassword.value.size !== 0
                                "
                            >
                                <Typography
                                    v-for="error in errorsFields.repeatPassword
                                        .value"
                                    :color="'error-msg'"
                                    :size="'xs'"
                                >
                                    {{ $t(error) }}
                                </Typography>
                            </template>
                        </Column>
                    </template>
                </Column>
                <Column full-width>
                    <Typography
                        v-if="authFormStore.error"
                        :color="'error-msg'"
                        :size="'s'"
                        >{{ $t(authFormStore.error) }}</Typography
                    >
                    <Button
                        :disabled="correctAuthChecker"
                        type="submit"
                        full-width
                    >
                        {{ $t(authContent.buttonText) }}
                    </Button>
                </Column>
            </Column>
        </form>
        <RouterLink
            :to="authContent.route"
            @click="authFormStore.error = undefined"
        >
            <Typography :align="'center'" class="auth-link">
                {{ $t(authContent.linkText) }}
            </Typography>
        </RouterLink>
    </Column>
</template>
<style>
@import 'AuthForm.css';
</style>

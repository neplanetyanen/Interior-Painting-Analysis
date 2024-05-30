<script setup lang="ts">
import { AuthForm } from '@/features/AuthForm';
import { Column } from '@/shared/ui';
import { Page } from '@/widgets/Page';
</script>
<template>
    <Page :header="'process'">
        <Column full-width :justify="'center'" :align="'center'" class="auth">
            <AuthForm />
        </Column>
    </Page>
</template>
<style scoped lang="css">
@import './SignUpPage.css';
</style>
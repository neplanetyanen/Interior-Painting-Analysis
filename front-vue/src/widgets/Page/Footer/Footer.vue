<script lang="ts" setup>
import { Column, Typography } from '@/shared/ui';
</script>
<template>
    <Column class="footer" :gap="'8'">
        <Typography :color="'light'" :weight="300">
            {{ $t('message.footerCompleted') }}
        </Typography>
        <Typography :color="'light'" :weight="300">
            {{ $t('message.footerCompanyName') }}
        </Typography>
    </Column>
</template>
<style lang="css" scoped>
@import url('./Footer.css')
</style>
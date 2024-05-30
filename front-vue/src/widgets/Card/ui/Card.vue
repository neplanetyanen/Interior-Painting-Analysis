<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { Column, Typography, Button } from '@/shared/ui';

export type BackgroundColorVariants = 'default' | 'colored'

const props = defineProps({
    backgroundColor: {
        type: String as PropType<BackgroundColorVariants>,
        default: 'default'
    },
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
});

const classes = computed(() => ({
    [props.backgroundColor]: true,
}));
</script>
<template>
    <Column full-width :class="classes" :align="'start'" :justify="'between'" :gap="'32'">
        <Typography :color="props.backgroundColor == 'default' ? 'dark' : 'light'" :size="'xl'" :weight="300">{{
            props.title }}
        </Typography>
        <Typography :color="props.backgroundColor == 'default' ? 'dark' : 'light'">{{ props.subtitle }}</Typography>
        <Button @click="$router.push('/login')"
            :variantColor="props.backgroundColor == 'default' ? 'white-btn' : 'blue-btn'">
            {{ $t('message.tryIt') }}
        </Button>
    </Column>
</template>
<style lang="css" scoped>
@import url('./Card.css');
</style>
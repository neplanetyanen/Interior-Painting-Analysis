<script setup lang="ts">
import { type PropType, computed } from 'vue';

export type ButtonVariant = 'header-btn' | 'content-btn' | 'menu-btn';
export type ButtonColor = 'white-btn' | 'blue-btn' | 'red-btn' | 'end-red-btn';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    variant: {
        type: String as PropType<ButtonVariant>,
        default: 'content-btn'
    },
    variantColor: {
        type: String as PropType<ButtonColor>,
        default: 'white-btn'
    },
    fullWidth: {
        type: Boolean,
    },
    isCarousel: {
        type: Boolean
    },
    square: {
        type: Boolean,
        default: false
    },
    isSelecting: {
        type: Boolean,
        default: false
    }
});

const classes = computed(() => ({
    'full-width': props.fullWidth,
    'disabled': props.disabled,
    [props.variant]: true,
    [props.variantColor]: true,
    'is-carousel': props.isCarousel,
    'square': props.square,
    'is-selecting': props.isSelecting
}));
</script>

<template>
    <button :disabled="disabled" type="button" :class="classes">
        <slot></slot>
    </button>
</template>

<style lang="css" scoped>
@import url('./Button.css');
</style>
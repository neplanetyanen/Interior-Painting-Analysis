<script setup lang="ts">
import Header from '../Header/Header.vue';
import Content from '../Content/Content.vue';
import Footer from '../Footer/Footer.vue';
import { type HeaderVariants } from '../Header/Header.vue';
import { type WelcomeBlockVariants } from '../WelcomeBlock/ui/WelcomeBlock.vue';
import type { PropType } from 'vue';
import { WelcomeBlock } from '../WelcomeBlock';

export type BackgroundColorVariants = 'blue-black' | 'white-black';

const props = defineProps({
    header: {
        type: String as PropType<HeaderVariants>,
        default: 'unauth'
    },
    background: {
        type: String as PropType<BackgroundColorVariants>,
        default: 'white-black'
    },
    welcomeBlock: {
        type: Boolean,
        default: false
    },
    welcomeBlockVariants: {
        type: String as PropType<WelcomeBlockVariants>,
        default: 'create'
    }
});
</script>
<template>
    <Header :header="props.header" />
    <WelcomeBlock v-if="welcomeBlock" :variant="$props.welcomeBlockVariants" />
    <div
        :class="{
            container: !welcomeBlock,
            [props.background]: true,
            'container-with-welcome-block': welcomeBlock
        }"
    >
        <Content>
            <slot></slot>
        </Content>
    </div>
    <Footer />
</template>
<style lang="css" scoped>
@import url('./Page.css');
</style>

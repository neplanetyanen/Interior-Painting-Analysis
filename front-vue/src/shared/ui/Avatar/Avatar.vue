<script setup lang="ts">
defineProps({
    width: {
        type: String,
        default: '55px'
    },
    height: {
        type: String,
        default: '55px'
    }
});
</script>

<template>
    <img :width="width" :height="height" />
</template>


<style lang="css" scoped>
@import url('./Avatar.css');
</style>
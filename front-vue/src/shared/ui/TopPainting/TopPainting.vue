<script setup lang="ts">
const props = defineProps({
    svgIcon: {
        type: Object
    },
    img: {
        type: String
    }
    // variant: {
    //     type: String as PropType<WelcomeBlockVariants>,
    //     default: 'create'
    // }
});
</script>
<template>
    <div class="top-painting">
        <svgIcon />
        <img :src="img" class="img-top-painting" />
    </div>
</template>
<style lang="css" scoped>
@import url('./TopPainting.css');
</style>

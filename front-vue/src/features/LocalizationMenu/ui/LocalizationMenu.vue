<script setup lang="ts">
import { Button, Row } from '@/shared/ui';
import LineBlackVertical from '@/shared/assets/figures/LineBlackVertical.vue';
import { useI18n } from 'vue-i18n';
import { useLocalizationStore } from '../model/localizationStore';
import { onMounted } from 'vue';

const localizationStore = useLocalizationStore();

const { locale } = useI18n();

onMounted(() => {
    localizationStore.changeLanguage(locale.value)
})

const changeLanguage = (lang: string) => {
    if (locale.value != lang) {
        locale.value = lang;
        localizationStore.changeLanguage(lang)
    }
}

</script>
<template>
    <Row :gap="'16'">
        <Button :is-selecting="localizationStore.english" @click="changeLanguage('en')" square>EN</Button>
        <LineBlackVertical />
        <Button :is-selecting="localizationStore.russian" @click="changeLanguage('ru')" square>RU</Button>
    </Row>
</template>
<style lang="css" scoped></style>
<script setup lang="ts">
import { Page } from '@/widgets/Page';
import { usePaintingsStore } from '@/entities/Paintings';
import { topPaintingPoz } from '@/shared/assets/icons/topPaintingPoz';
import { Column, Typography, TopPainting } from '@/shared/ui';
import { useHistoryCarouselStore } from '@/features/HistoryCarousel/model/HistoryCarousel';

const paintingsStore = usePaintingsStore();
const historyCarouselStore = useHistoryCarouselStore();
</script>
<template>
    <Page
        welcome-block
        :background="'blue-black'"
        :header="'auth'"
        :welcome-block-variants="'history'"
    >
        <template v-if="paintingsStore.paintings">
            <Column :gap="'42'" class="result-create">
                <Column :gap="'32'">
                    <Typography :size="'m'">{{
                        $t('message.createPageInterior')
                    }}</Typography>
                    <img
                        :src="paintingsStore.paintings.interior"
                        class="result-interior"
                    />
                </Column>
                <Column :gap="'32'">
                    <Typography :size="'m'">{{
                        $t('message.createPageTopPaintings')
                    }}</Typography>
                    <Column :gap="'32'" :align="'start'">
                        <Column
                            v-for="(painting, index) in paintingsStore.paintings
                                .topPaintings"
                            :key="index"
                            :gap="'4'"
                            :align="'start'"
                        >
                            <TopPainting
                                :svg-icon="topPaintingPoz[index]"
                                :img="painting.url"
                            />
                            <Column
                                :align="'start'"
                                :gap="'4'"
                                class="paintings-information"
                            >
                                <Typography>{{ painting.artist }}</Typography>
                                <Typography>{{ painting.title }}</Typography>
                            </Column>
                        </Column>
                    </Column>
                </Column>
            </Column>
        </template>
        <template
            v-if="!paintingsStore.paintings && !historyCarouselStore.isLoading"
        >
            <Column :gap="'32'" class="result-create">
                <Typography :size="'m'">{{
                    $t('message.noHistoryMsg')
                }}</Typography>
                <RouterLink :to="'/create'">
                    <Typography :size="'m'" class="create-link">{{
                        $t('message.noHistoryLinkMsg')
                    }}</Typography>
                </RouterLink>
            </Column>
        </template>
    </Page>
</template>
<style scoped>
@import url('./HistoryPage.css');
</style>

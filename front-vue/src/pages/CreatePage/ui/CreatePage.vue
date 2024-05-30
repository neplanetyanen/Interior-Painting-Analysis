<script setup lang="ts">
import { Page } from '@/widgets/Page';
import { Column, TopPainting, Typography } from '@/shared/ui';
import { topPaintingPoz } from '@/shared/assets/icons/topPaintingPoz';
import { usePaintingsStore } from '@/entities/Paintings';
import { type Paintings } from '@/entities/Paintings';
import { computed, onMounted, ref, type Ref } from 'vue';

const paintingsStore = usePaintingsStore();
</script>
<template>
    <Page welcome-block :background="'blue-black'" :header="'auth'">
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
    </Page>
</template>
<style scoped>
@import url('./CreatePage.css');
</style>

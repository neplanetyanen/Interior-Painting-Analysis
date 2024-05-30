<script setup lang="ts">
import { Row, Column } from '@/shared/ui';
import CarouselLeftBtn from '@/shared/assets/icons/CarouselLeftBtn.vue';
import CarouselRightBtn from '@/shared/assets/icons/CarouselRightBtn.vue';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useHistoryCarouselStore } from '../model/HistoryCarousel';
import { usePaintingsStore } from '@/entities/Paintings';
import Loader from '@/shared/assets/figures/LoaderWhite.vue';

const historyCarouselStore = useHistoryCarouselStore();
const paintingsStore = usePaintingsStore();

onMounted(async () => {
    await historyCarouselStore.history();
});

const carouselOffset = ref(0);
const positionPaintings = ref(0);
const selectedPaintingIndex = ref(0);

const countPaintings = computed(() =>
    historyCarouselStore.historyAll ? historyCarouselStore.historyAll.length : 0
);

const moveCarouselLeft = () => {
    if (positionPaintings.value > 0) {
        carouselOffset.value += 384;
        positionPaintings.value -= 1;
    }
};

const moveCarouselRight = () => {
    if (positionPaintings.value < countPaintings.value - 3) {
        carouselOffset.value -= 384;
        positionPaintings.value += 1;
    }
};

const handlePaintingClick = (index: number) => {
    selectedPaintingIndex.value = index;
    if (historyCarouselStore.historyAll) {
        paintingsStore.setPaintings(
            historyCarouselStore.historyAll[index],
            'history'
        );
    }
};
</script>
<template>
    <template
        v-if="
            historyCarouselStore.historyAll && !historyCarouselStore.isLoading
        "
    >
        <Row :justify="'center'" class="history-carousel" :gap="'0'">
            <CarouselLeftBtn @click="moveCarouselLeft" class="btn-carousel" />
            <Row class="block-carousel">
                <Row
                    :style="{ transform: `translateX(${carouselOffset}px)` }"
                    class="carousel"
                >
                    <template
                        v-for="(
                            interior, index
                        ) in historyCarouselStore.historyAll"
                        :key="index"
                    >
                        <Column class="border-painting">
                            <img
                                class="painting"
                                @click="handlePaintingClick(Number(index))"
                                :class="{
                                    'red-border-carousel':
                                        selectedPaintingIndex === Number(index)
                                }"
                                :src="interior.interior"
                            />
                        </Column>
                    </template>
                </Row>
            </Row>
            <CarouselRightBtn @click="moveCarouselRight" class="btn-carousel" />
        </Row>
    </template>
    <template v-if="historyCarouselStore.isLoading">
        <Column class="loader-block">
            <Loader class="loader" />
        </Column>
    </template>
</template>
<style lang="css" scoped>
@import url('./HistoryCarousel.css');
</style>

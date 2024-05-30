<script setup lang="ts">
import Clock from '@/shared/assets/icons/Clock.vue';
import { Column, Row, Typography } from '@/shared/ui';
import { Card } from '@/widgets/Card';
import { Page } from '@/widgets/Page';
</script>
<template>
    <Page>
        <Column class="interior" :justify="'end'" :align="'end'">
            <Card
                class="colored-card"
                :title="$t('message.sloganCompanyName')"
                :subtitle="$t('message.sloganSubArtMade')"
                :backgroundColor="'colored'"
            />
        </Column>
        <Column class="square-interior-with-figures" :align="'end'">
            <Card
                class="small-default-card"
                :title="$t('message.sloganReflectionOf')"
                :subtitle="$t('message.sloganSubGetUnique')"
            />
        </Column>
        <Column :gap="'0'">
            <Row :gap="'0'">
                <img src="@/shared/assets/images/Marine_Interior.png" />
                <Column class="card-with-horizontal-lines" :justify="'between'">
                    <Typography :color="'light'" :size="'xxl'">{{
                        $t('message.sloganMakeYourHome')
                    }}</Typography>
                </Column>
            </Row>
            <Row :gap="'0'">
                <img src="@/shared/assets/images/Surreal_Interior.png" />
                <Column :gap="'0'">
                    <Column
                        class="card-with-vertical-lines"
                        :justify="'between'"
                    >
                        <Clock />
                        <Typography
                            :color="'light'"
                            v-html="$t('message.sloganWeBelieve')"
                        ></Typography>
                    </Column>
                    <img src="@/shared/assets/images/Delicate_Interior.png" />
                </Column>
                <img src="@/shared/assets/images/Tropical_Interior.png" />
            </Row>
        </Column>
        <Column
            :justify="'end'"
            :align="'start'"
            class="round-interior-with-figures"
        >
            <Card
                class="default-card"
                :title="$t('message.sloganTheArtOfSmart')"
                :subtitle="$t('message.sloganSubOurArt')"
            />
        </Column>
    </Page>
</template>
<style scoped lang="css">
@import './HomePage';
</style>

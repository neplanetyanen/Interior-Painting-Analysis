<script setup lang="ts">
import { Column, Typography } from '@/shared/ui';
import { FileManager } from '@/features/FileManager';
import {
    CREATE_PAINTINGS_LOCAL_STORAGE_KEY,
    USER_LOCAL_STORAGE_KEY
} from '@/shared/consts/localStorage';
import { onMounted, ref, type PropType, type Ref } from 'vue';
import { HistoryCarousel } from '@/features/HistoryCarousel';
import { type User } from '@/entities/User';
import type { Paintings } from '@/entities/Paintings';

const currentUser: Ref<User | null> = ref(null);
const fssfs: Ref<String | null> = ref(null);

onMounted(() => {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (user) {
        currentUser.value = JSON.parse(user);
    }
    const fssfs = localStorage.getItem(CREATE_PAINTINGS_LOCAL_STORAGE_KEY);
});

export type WelcomeBlockVariants = 'create' | 'history';

const props = defineProps({
    variant: {
        type: String as PropType<WelcomeBlockVariants>,
        default: 'create'
    }
});
</script>
<template>
    <Column class="welcome-block">
        <template v-if="props.variant === 'create'"
            ><Typography :color="'light'" :size="'m'">
                {{
                    $t('message.helloMsgStart') +
                    currentUser?.username +
                    $t('message.helloMsgEnd')
                }}
            </Typography>
            <FileManager />
        </template>
        <template v-if="$props.variant === 'history'">
            <Typography :color="'light'" :size="'m'">
                {{ $t('message.carouselMsg') }}
            </Typography>
            <HistoryCarousel />
        </template>
    </Column>
</template>
<style lang="css" scoped>
@import url('./WelcomeBlock.css');
</style>

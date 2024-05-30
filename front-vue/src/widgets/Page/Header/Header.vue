<script setup lang="ts">
import { Row, Button, Typography, Column } from '@/shared/ui';
import LineBlackVertical from '@/shared/assets/figures/LineBlackVertical.vue';
import Icon from '@/shared/assets/icons/Icon.vue';
import { onMounted, ref, type PropType, type Ref } from 'vue';
import UserBtn from '@/shared/assets/icons/UserBtn.vue';
import { LocalizationMenu } from '@/features/LocalizationMenu';
import { useUserStore, type User } from '@/entities/User';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage';

const userStore = useUserStore();
const currentUser: Ref<User | null> = ref(null);

onMounted(async () => {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (user) {
        currentUser.value = JSON.parse(user);
    }
});

export type HeaderVariants = 'auth' | 'unauth' | 'process';

const props = defineProps({
    header: {
        type: String as PropType<HeaderVariants>,
        default: 'unauth'
    }
});

const activeMenu = ref(false);

const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
        !target.closest('.user-menu') &&
        !target.closest('.user-bar') &&
        !target.closest('button')
    ) {
        activeMenu.value = false;
    }
};

document.addEventListener('click', handleClickOutside);
</script>
<template>
    <Column class="fixed" :align="'end'">
        <Row class="header">
            <Row class="common-header" :justify="'between'">
                <Row :gap="'32'">
                    <LocalizationMenu />
                    <Row :gap="'16'">
                        <Icon
                            @click="
                                props.header === 'auth'
                                    ? $router.push('/create')
                                    : $router.push('/')
                            "
                            class="icon"
                        />
                        <Typography :size="'s'" :weight="300"
                            >Interior Painting An​​alysis​</Typography
                        >
                    </Row>
                </Row>
                <Row v-if="props.header === 'unauth'" :gap="'16'">
                    <Button
                        :variant="'header-btn'"
                        @click="$router.push('/signup')"
                        >{{ $t('message.signup') }}</Button
                    >
                    <LineBlackVertical />
                    <Button
                        :variant="'header-btn'"
                        @click="$router.push('/login')"
                        >{{ $t('message.login') }}</Button
                    >
                </Row>
                <Row
                    @click="activeMenu = !activeMenu"
                    v-if="props.header === 'auth'"
                    :gap="'16'"
                    class="user-bar"
                >
                    <Typography>{{ currentUser?.username }}</Typography>
                    <img src="@/shared/assets/images/Avatar.png" />
                    <UserBtn class="user-btn" />
                </Row>
            </Row>
        </Row>
        <Column
            :gap="'0'"
            v-if="props.header === 'auth'"
            :class="{ 'user-menu': true, active: activeMenu }"
        >
            <!-- <template v-if="$router.currentRoute.value.fullPath !== '/user'">
                <Button
                    @click="$router.push('/user')"
                    :variant="'menu-btn'"
                    :variantColor="'red-btn'"
                    >{{ $t('message.profileMenu') }}
                </Button>
            </template> -->
            <template v-if="$router.currentRoute.value.fullPath !== '/create'">
                <Button
                    @click="$router.push('/create')"
                    :variant="'menu-btn'"
                    :variantColor="'red-btn'"
                    >{{ $t('message.analyzeMenu') }}
                </Button>
            </template>
            <template v-if="$router.currentRoute.value.fullPath !== '/history'">
                <Button
                    @click="$router.push('/history')"
                    :variant="'menu-btn'"
                    :variantColor="'red-btn'"
                    >{{ $t('message.historyMenu') }}
                </Button>
            </template>
            <Button
                @click="userStore.logout"
                :variant="'menu-btn'"
                :variantColor="'end-red-btn'"
                >{{ $t('message.logoutMenu') }}
            </Button>
        </Column>
    </Column>
</template>
<style lang="css" scoped>
@import url('./Header.css');
</style>

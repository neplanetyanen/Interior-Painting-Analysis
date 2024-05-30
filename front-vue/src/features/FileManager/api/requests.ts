import { buildApi } from '@/shared/api/lib/useApi';
import { type Paintings } from '@/entities/Paintings';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage';
import { onMounted, ref, watchEffect, type Ref } from 'vue';
import type { User } from '@/entities/User';

export const createNamespace = 'create';

export interface Interior {
    bytes: string;
}

const currentUser: Ref<User | null> = ref(null);

const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
if (user) {
    currentUser.value = JSON.parse(user);
}
export const useCreateApi = buildApi<Paintings, Interior>(createNamespace, {
    url: `/users/${currentUser.value?.id}/interior`,
    method: 'POST',
    withCredentials: true
});

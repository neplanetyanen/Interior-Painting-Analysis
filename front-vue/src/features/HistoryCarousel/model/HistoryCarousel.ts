import { type _GettersTree, defineStore } from 'pinia';
import { usePaintingsStore, type Paintings } from '@/entities/Paintings';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage';
import { api } from '@/shared/api';
import { type User } from '@/entities/User';

export const historyCarouselNamespace = 'historyCarouselManager';

export interface HistoryCarouselSchema {
    user: User | undefined;
    historyAll: Paintings[] | undefined;
    isLoading: boolean;
}

export interface _HistoryCarouselGetterSchema
    extends _GettersTree<HistoryCarouselSchema> {}

export interface HistoryCarouselActionsSchema {
    history: () => Promise<void>;
}

export const useHistoryCarouselStore = defineStore<
    string,
    HistoryCarouselSchema,
    _HistoryCarouselGetterSchema,
    HistoryCarouselActionsSchema
>(historyCarouselNamespace, {
    state: (): HistoryCarouselSchema => ({
        user: undefined,
        historyAll: undefined,
        isLoading: false
    }),
    actions: {
        async history() {
            this.isLoading = true;
            try {
                const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
                if (user) {
                    this.user = JSON.parse(user);
                }
                if (this.user) {
                    const response = await api.get(
                        `/users/${this.user.id}/history`,
                        { withCredentials: true }
                    );
                    const dataPaintings = response.data.history;
                    const paintings: Paintings[] = dataPaintings.map(
                        (item: any) =>
                            <Paintings>{
                                interior: item.interiorId,
                                topPaintings: [
                                    item.firstImageId,
                                    item.secondImageId,
                                    item.thirdImageId,
                                    item.fourthImageId,
                                    item.fifthImageId
                                ]
                            }
                    );
                    if (response) {
                        this.historyAll = paintings;
                        const paintingsStore = usePaintingsStore();
                        paintingsStore.setPaintings(paintings[0], 'history');
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        }
    }
});

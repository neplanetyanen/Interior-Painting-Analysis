import { type _GettersTree, defineStore } from 'pinia';

import { type Paintings } from './types/paintings';

export const paintingsNamespace = 'painting';

export interface PaintingsSchema {
    paintings?: Paintings;
}

export interface _PaintingsGetterSchema extends _GettersTree<PaintingsSchema> {}

export interface PaintingsActionsSchema {
    setPaintings: (params: Paintings, mod: 'create' | 'history') => void;
    resetPaintings: () => void;
}

export const usePaintingsStore = defineStore<
    string,
    PaintingsSchema,
    _PaintingsGetterSchema,
    PaintingsActionsSchema
>(paintingsNamespace, {
    state: (): PaintingsSchema => ({
        paintings: undefined
    }),
    actions: {
        setPaintings(paintings: Paintings) {
            this.paintings = paintings;
            window.dispatchEvent(new Event('paintngs-update'));
        },
        resetPaintings() {
            this.paintings = undefined;
        }
    }
});

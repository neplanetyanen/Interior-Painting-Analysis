import { type _GettersTree, defineStore } from 'pinia';
import { LOCALE_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage';

export const localizationFormNamespace = 'localization';

export interface LocalizationSchema {
    english: boolean;
    russian: boolean;
}

export interface _LocalizationGetterSchema
    extends _GettersTree<LocalizationSchema> {}

export interface LocalizationActionsSchema {
    changeLanguage: (lang: string) => void;
}

export const useLocalizationStore = defineStore<
    string,
    LocalizationSchema,
    _LocalizationGetterSchema,
    LocalizationActionsSchema
>(localizationFormNamespace, {
    state: (): LocalizationSchema => ({
        english: true,
        russian: false
    }),
    actions: {
        changeLanguage(lang: string) {
            localStorage.setItem(LOCALE_LOCAL_STORAGE_KEY, lang);
            if (lang === 'en') {
                this.english = true;
                this.russian = false;
            } else {
                this.english = false;
                this.russian = true;
            }
        }
    }
});

import { createI18n } from 'vue-i18n';
import { messages } from './messages';
import { LOCALE_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage';

const savedLocale = localStorage.getItem(LOCALE_LOCAL_STORAGE_KEY);
const defaultLocale = 'en';

export const i18n = createI18n({
    legacy: false,
    locale: savedLocale || defaultLocale,
    globalInjection: true,
    messages
});

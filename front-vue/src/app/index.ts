import { createApp } from 'vue';

import App from './index.vue';
import { router } from './providers/router';
import { store } from './providers/store';
import { i18n } from './localization';

export const app = createApp(App).use(store).use(router).use(i18n);

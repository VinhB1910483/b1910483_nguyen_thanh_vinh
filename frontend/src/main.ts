import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "vue-toastification/dist/index.css";
import '@/assets/styles/main.scss'
import { FontAwesomeIcon } from './util/fontRegister'
import { options, Toast } from './util/pluginRegister';
import VueLazyload from 'vue-lazyload'
import { useAuthStore } from './stores/auth/AuthStore';

const app = createApp(App)

app.use(VueLazyload, {
    preLoad: 1.3,
    error: '/lazy-error.png',
    loading: '/lazy-load.gif',
    attempt: 1
})
app.use(router)
app.use(createPinia().use(({ store }) => {
    store.router = markRaw(router)
}))
if (useAuthStore().user) useAuthStore().refreshToken(false);
app.use(Toast, options);

app
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

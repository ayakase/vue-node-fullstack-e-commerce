import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.vue'
import router from './router'
import VueNumerals from 'vue-numerals';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueCookies from 'vue-cookies'

const vuetify = createVuetify({
    components,
    directives,
})
const app = createApp(App)
app.use(createPinia())
app.use(bootstrap)
app.use(router)
app.use(vuetify)
app.use(VueNumerals);
app.mount('#app')

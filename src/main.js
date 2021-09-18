import { createApp } from 'vue'

import VueLazyload from '@jambonn/vue-lazyload'
import VueGtag from 'vue-gtag'

import App from './App.vue'
import store from './store'

const app = createApp(App)

app.use(store)

const loadingImage = require('./assets/spinner.gif')

app.use(VueGtag, {
  config: { id: 'G-LGZ54YCVL5' }
})

app.use(VueLazyload, {
  preLoad: 1.3,
  // TODO: add error image
  // error: errorimage,
  loading: loadingImage,
  attempt: 3,
})

app.mount('#app')

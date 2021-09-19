import { createApp } from 'vue'

import VueLazyload from '@jambonn/vue-lazyload'
import VueGtag from 'vue-gtag'

import App from './App.vue'
import store from './store'

const app = createApp(App)

app
  .use(store)
  .use(VueGtag, {
    config: { id: 'G-LGZ54YCVL5' }
  })
  .use(VueLazyload, {
    preLoad: 1.3,
    // TODO: add error image
    // error: errorimage,
    loading: require('./assets/spinner.gif'),
    attempt: 3,
  })

app.mount('#app')

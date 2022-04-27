import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import vuetify from '@/plugins/vuetify' // path to vuetify export


// import store from './store/store'

Vue.config.productionTip = false

Vue.use(VueRouter)

import HomePage from './page/HomePage.vue'
import RulesPage from './page/RulesPage.vue'
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
// import Editor from './components/Editor.vue'
// import EditorPage from './page/Editor.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: HomePage },
    { path: '/rules', component: RulesPage },
    { path: '/hello', component: HelloWorld },
    { path: '/Test', component: Test },
    // { path: '/editor', component: EditorPage },
  ]
});

new Vue({
  // store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')

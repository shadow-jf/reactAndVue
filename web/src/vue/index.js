import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './vuex/index.js';

import './style/style.css';

import './style/style.styl';

import p1 from './image/1.jpg';

var fun = () => {
  console.log('vue', p1, 11);
};
fun();

new Vue({
  store,
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});

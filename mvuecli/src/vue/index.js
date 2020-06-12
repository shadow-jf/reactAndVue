import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './vuex/index.js';
import './style/style.css';
import './style/style.styl';


new Vue({
    store,
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

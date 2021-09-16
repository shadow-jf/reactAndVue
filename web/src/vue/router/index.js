import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const hello = resolve => require(['../content/hello.vue'], resolve);

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'app',
    component: hello,
    meta: {
      title: 'hello',
    },
  }],
});


export default router;
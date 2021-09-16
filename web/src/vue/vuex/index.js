import Vue from 'vue';
import Vuex from 'vuex';
import {state} from './state';
import actions from './action.js';
import getters from './getters.js';
import mutations from './mutation.js';

Vue.use(Vuex);


//需要导出Store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
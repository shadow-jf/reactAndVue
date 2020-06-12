import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {state} from'./state';
import actions from'./action.js';
import getters from'./getters.js';
import mutations from './mutation.js';



//需要导出Store对象
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});
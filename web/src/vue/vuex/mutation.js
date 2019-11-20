import * as type from './type';

const mutations = {
	[type.showhight](state) {
		state.initState = !state.initState;
		// console.log(state.initState)
		state.initState?state.rightName='确认':state.rightName='标亮'
	},
  [type.showhight2](state) {
    state.initState2 = !state.initState2;
    // console.log(state.initState)
    state.initState2?state.rightName2='确认':state.rightName2='标亮'
  }
};

export default mutations

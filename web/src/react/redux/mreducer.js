import act from './actiontype2.js';

// 这就是reducer处理函数，参数是状态和新的action
export function mcounter(state = 0, action) {
  // let state = state||0
  switch (action.type) {
    case act.app:
      console.log(state, 888);
      return state + 2;
    case act.gun:
      return state - 1;
    default:
      return 15;
  }
}


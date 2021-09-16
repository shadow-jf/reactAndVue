import actiontype from './actiontype';
// 这就是reducer处理函数，参数是状态和新的action
var Obj = {state: 0};

export function counter(Obj, action) {
  // let state = state||0
  switch (action.type) {
    case actiontype.ADD_GUN:
      Obj.state = Obj.state + 2;
      return Object.assign({}, Obj);
    case actiontype.REMOVE_GUN:
      Obj.state = Obj.state - 1;
      return Object.assign({}, Obj);

    default:
      return Object.assign({}, {state: 15});

  }
}


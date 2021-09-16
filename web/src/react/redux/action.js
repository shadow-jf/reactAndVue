import actiontype from './actiontype';

export function addGun() {
  return {type: actiontype.ADD_GUN};
}

export function removeGun() {
  return {type: actiontype.REMOVE_GUN};
}

// 延迟添加，拖两天再给
export function addGunAsync() {
  // thunk插件的作用，这里可以返回函数，
  return dispatch => {
    setTimeout(() => {
      // 异步结束后，手动执行dispatch
      dispatch(addGun());
    }, 2000);
  };

}
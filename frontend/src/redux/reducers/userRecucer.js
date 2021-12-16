import { INIT_STATE } from "../constant";
import { isLogin } from "../actions/userAction";
import { getType } from "../actions/fun";

export function isLoginReducer(state = INIT_STATE.toggleLogin, action) {
  //   console.log(getType(isLogin));
  switch (action.type) {
    case getType(isLogin):
      return {
        ...state,
        isToggle: !state.isToggle,
      };
    default:
      return {
        ...state,
        isToggle: false,
      };
  }
}

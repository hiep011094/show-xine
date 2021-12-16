import { INIT_STATE } from "../constant";
import { getMenus } from "../actions/menuAction";
import { getType } from "../actions/fun";

export default function menusReducer(state = INIT_STATE.menus, action) {
  switch (action.type) {
    case getType(getMenus.getMenusReq):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getMenus.getMenusSs):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getMenus.getMenusFail):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

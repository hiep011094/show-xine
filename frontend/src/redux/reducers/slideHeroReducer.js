import { INIT_STATE } from "../constant";
import { getSlideHeros } from "../actions/slideHeroAction";
import { getType } from "../actions/fun";

export default function slideHeroReducer(
  state = INIT_STATE.slideHeros,
  action
) {
  switch (action.type) {
    case getType(getSlideHeros.getSlideHerosReq):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getSlideHeros.getSlideHerosSs):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getSlideHeros.getSlideHerosFail):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

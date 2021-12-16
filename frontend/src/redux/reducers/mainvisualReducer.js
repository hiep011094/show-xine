import { INIT_STATE } from "../constant";
import { getMainvisual } from "../actions/mainvisualAction";
import { getType } from "../actions/fun";

export default function mainvisualReducer(
  state = INIT_STATE.mainvisual,
  action
) {
  switch (action.type) {
    case getType(getMainvisual.getMainvisualReq):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getMainvisual.getMainvisualSs):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getMainvisual.getMainvisualFail):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

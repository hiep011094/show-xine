import { takeLatest } from "redux-saga/effects";
import { getMenus } from "../actions/menuAction";
import { getMainvisual } from "../actions/mainvisualAction";
import { getSocials } from "../actions/socialAction";
import { getSlideHeros } from "../actions/slideHeroAction";
import fetchMenusSaga from "./menuSaga";
import fetchMainvisualSaga from "./mainvisualSaga";
import fetchSocialsSaga from "./socialsSaga";
import fetchSlideHeroSaga from "./slideHeroSaga";

function* saga() {
  // console.log(getMenus.getMenusReq);
  yield takeLatest(getMenus.getMenusReq, fetchMenusSaga);
  yield takeLatest(getMainvisual.getMainvisualReq, fetchMainvisualSaga);
  yield takeLatest(getSocials.getSocialsReq, fetchSocialsSaga);
  yield takeLatest(getSlideHeros.getSlideHerosReq, fetchSlideHeroSaga);
}

export default saga;

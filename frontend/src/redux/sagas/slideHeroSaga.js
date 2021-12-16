import { call, put } from "redux-saga/effects";
import { getSlideHeros } from "../actions/slideHeroAction";
import { fetchSlideHeros } from "../../api";

function* fetchSlideHeroSaga(action) {
  const slideHeros = yield call(fetchSlideHeros);
  yield put(getSlideHeros.getSlideHerosSs(slideHeros.data));
}

export default fetchSlideHeroSaga;

import { call, put } from "redux-saga/effects";
import { getSocials } from "../actions/socialAction";
import { fetchSocials } from "../../api";

function* fetchSocialsSaga(action) {
  const socials = yield call(fetchSocials);
  yield put(getSocials.getSocialsSs(socials.data));
}

export default fetchSocialsSaga;

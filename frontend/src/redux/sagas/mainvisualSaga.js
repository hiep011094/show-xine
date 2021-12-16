import { call, put } from "redux-saga/effects";
import { getMainvisual } from "../actions/mainvisualAction";
import { fetchMainvisual } from "../../api";

function* fetchMainvisualSaga(action) {
  const mainvisual = yield call(fetchMainvisual);
  yield put(getMainvisual.getMainvisualSs(mainvisual.data));
}

export default fetchMainvisualSaga;

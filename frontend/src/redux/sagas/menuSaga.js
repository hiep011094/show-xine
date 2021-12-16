import { call, put } from "redux-saga/effects";
import { getMenus } from "../actions/menuAction";
import { fetchMenus } from "../../api";

function* fetchMenusSaga(action) {
  const Menus = yield call(fetchMenus);
  yield put(getMenus.getMenusSs(Menus.data));
}

export default fetchMenusSaga;

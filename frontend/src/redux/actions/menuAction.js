import { createActions } from "redux-actions";

export const getMenus = createActions({
  getMenusReq: undefined,
  getMenusSs: (payload) => payload,
  getMenusFail: (err) => err,
});

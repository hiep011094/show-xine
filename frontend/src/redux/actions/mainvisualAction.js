import { createActions } from "redux-actions";

export const getMainvisual = createActions({
  getMainvisualReq: undefined,
  getMainvisualSs: (payload) => payload,
  getMainvisualFail: (err) => err,
});

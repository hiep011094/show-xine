import { createActions } from "redux-actions";

export const getSocials = createActions({
  getSocialsReq: undefined,
  getSocialsSs: (payload) => payload,
  getSocialsFail: (err) => err,
});

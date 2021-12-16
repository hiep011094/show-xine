import { createActions } from "redux-actions";

export const getSlideHeros = createActions({
  getSlideHerosReq: undefined,
  getSlideHerosSs: (payload) => payload,
  getSlideHerosFail: (err) => err,
});

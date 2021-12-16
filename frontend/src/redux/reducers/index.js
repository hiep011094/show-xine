import { combineReducers } from "redux";
import menus from "./menusReducer";
import mainvisual from "./mainvisualReducer";
import socials from "./socialsReducer";
import slideHeros from "./slideHeroReducer";
import { isLoginReducer as toggleLogin } from "./userRecucer";

export default combineReducers({
  menus,
  mainvisual,
  socials,
  slideHeros,
  toggleLogin,
});

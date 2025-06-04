// ** Redux Imports
import { combineReducers } from "redux";

// ** Reducers Imports
import auth from "./auth";
import navbar from "./navbar";
import layout from "./layout";
import users from "./users";
import loading from "./loading";
import dashboard from "./dashboard";
import category from "./category";
import test from "./test";
import coupon from "./coupon";
import inquiry from "./inquiry";
import banner from "./banner";
import setting from "./setting";
import healthRisk from "./healthRisk";
import habit from "./habit";
import media from "./media";
import menuByAdminReducer from "./menu/menuByAdmin";
import menuReducer from "./menu";
import adminRoleReducer from "./adminRole";
import adminManageReducer from "./adminManage";
import landing from "./landingPage";
import labReducer from "./lab";
import orderReducer from "./order";
import FaqsReducer from "./faqs";
import subscriber from "./subscriber";
import biowaste from "./biowaste";
import appointment from "./appointment";
import prescription from "./prescription";
import contact from "./contactUs";
import ourTeam from "./ourTeam";
import feedback from "./feedback";
import corporate from "./corporate";
import careers from "./careers";
import appliedJob from "./appliedJob";
import franchises from "./franchises";
import notification from "./notification";
import notificationCategory from "./notificationCategory";

const rootReducer = combineReducers({
  auth,
  navbar,
  users,
  layout,
  loading,
  dashboard,
  category,
  test,
  coupon,
  inquiry,
  banner,
  setting,
  healthRisk,
  habit,
  media,
  menuByAdminReducer,
  menuReducer,
  adminRoleReducer,
  adminManageReducer,
  landing,
  ourTeam,
  labReducer,
  orderReducer,
  FaqsReducer,
  subscriber,
  biowaste,
  appointment,
  prescription,
  contact,
  feedback,
  corporate,
  careers,
  appliedJob,
  franchises,
  notification,
  notificationCategory
});

export default rootReducer;

import { combineReducers } from "redux";
import tabsReducer from "./tabsReducer";
import sidebarReducer from "./sidebarReducer";
import notesReducer from "./notesReducer";

const allReducers = combineReducers({
  selectedTab: tabsReducer,
  sideBar: sidebarReducer,
  notes: notesReducer
});

export default allReducers;

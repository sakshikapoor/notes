import { combineReducers } from "redux";
import tabsReducer from "./tabsReducer";
import sidebarReducer from "./sidebarReducer";
import notesReducer from "./notesReducer";
import modalReducer from "./modalReducer";
import searchReducer from "./searchReducer";
import themeReducer from "./themeReducer";

const allReducers = combineReducers({
  selectedTab: tabsReducer,
  sideBar: sidebarReducer,
  notes: notesReducer,
  modal: modalReducer,
  search: searchReducer,
  theme: themeReducer
});

export default allReducers;

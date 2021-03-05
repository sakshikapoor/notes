import tabs from "../initializations/tabs";

const initialSelectedTab = tabs[0].id;

const tabsReducer = (state = initialSelectedTab, action) => {
  switch (action.type) {
    case "SELECT_TAB":
      state = action.payload.tabId;
      return state;

    default:
      return state;
  }
};
export default tabsReducer;

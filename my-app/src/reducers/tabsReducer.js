import tabs from "../initializations/tabs";

const initialSelectedTab = tabs[0].id;

const tabsReducer = (state = initialSelectedTab, action) => {
  switch (action.type) {
    case "SELECT_TAB":
      const newState = action.payload.tabId;
      return newState;

    default:
      return state;
  }
};
export default tabsReducer;

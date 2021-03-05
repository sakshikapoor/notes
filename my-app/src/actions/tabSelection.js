const selectTab = tabId => {
  return {
    type: "SELECT_TAB",
    payload: {
      tabId: tabId
    }
  };
};

export default selectTab;

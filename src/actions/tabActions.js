const selectTab = tabId => {
  return {
    type: "SELECT_TAB",
    payload: {
      tabId: tabId
    }
  };
};

const actions = { selectTab }
export default actions

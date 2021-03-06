const tabsReducer = (state = "", action) => {
  switch (action.type) {
    case "OPEN_SEARCH":
      const newState = action.payload;
      return newState;

    case "CLOSE_SEARCH":
      return "";

    default:
      return state;
  }
};
export default tabsReducer;

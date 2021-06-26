const openSearch = searchString => {
  return {
    type: "OPEN_SEARCH",
    payload: searchString
  };
};

const closeSearch = () => {
  return {
    type: "CLOSE_SEARCH"
  };
};

const actions = { openSearch, closeSearch };
export default actions
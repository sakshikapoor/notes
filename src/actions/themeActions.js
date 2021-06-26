const setTheme = theme => {
  return {
    type: "SET_THEME",
    payload: {
      theme: theme
    }
  };
};

export { setTheme };

export const ThemeReducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return { ...state, darkTheme: !state.darkTheme };
      default:
        return state;
    }
  };
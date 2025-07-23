export const initialState = { authuser: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "Set_User":
      return { ...state, authuser: action.authuser };
    default:
      return state;
  }
};
export default reducer;

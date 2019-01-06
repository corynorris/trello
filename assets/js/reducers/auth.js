const signIn = (state = [], action) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log("SIGN_IN received");
      return state;
    default:
      return state;
  }
};

export default signIn;

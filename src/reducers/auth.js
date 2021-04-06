const authReducer = (user = { authData: localStorage.getItem("user") }, action) => {
  switch (action.type) {
    case 'AUTH':
      if(!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      }
      
      return { ...user, authData: action.data, loading: false, errors: null };
    case 'LOGOUT':
      localStorage.removeItem("user");

      return { ...user, authData: null, loading: false, errors: null };
    default:
      return user;
  }
};

export default authReducer;
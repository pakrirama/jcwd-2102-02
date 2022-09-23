const init_state = {
  id: 0,
  username: "",
  email: "",
  full_name: "",
  is_verified: 0,
  birth_date: "",
  phone: "",
  gender: "",
  role: "",
  image_url: "",
};
import auth_types from "./type";

function auth_reducer(state = init_state, action) {
  if (action.type === auth_types.AUTH_LOGIN) {
    return {
      ...state,
      id: action?.payload?.id,
      username: action?.payload?.username,
      email: action?.payload?.email,
      password: action?.payload?.password,
      full_name: action?.payload?.full_name,
      role: action?.payload?.role,
      is_verified: action?.payload?.is_verified,
      birth_date: action?.payload?.birth_date,
      phone: action?.payload?.phone,
      gender: action?.payload?.gender,
      image_url: action?.payload?.image_url,
      

      
    };
  } else if (action.type === auth_types.AUTH_LOGOUT) {
    return init_state;
  }

  return state;
}

export default auth_reducer;

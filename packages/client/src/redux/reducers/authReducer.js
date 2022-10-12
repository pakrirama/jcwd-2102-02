const initialState = {
  id: '',
  username: '',
  email: '',
  full_name: '',
  role: '',
  is_verified: '',
  birth_date: '',
  phone: '',
  gender: '',
  default_address: 0,
  image_url: '',
  order_id: '',
};

const authReducer = (state = initialState, action) => {
  if (action.type === 'AUTH_LOGIN') {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      email: action.payload.email,
      full_name: action.payload.full_name,
      role: action.payload.role,
      is_verified: action.payload.is_verified,
      birth_date: action.payload.birth_date,
      phone: action.payload.phone,
      gender: action.payload.gender,
      default_address: action.payload.default_address,
      image_url: action.payload.image_url,
      is_verified: action.payload.is_verified,
    };
  }

  if (action.type === 'SET_ORDER_ID') {
    return {
      ...state,
      order_id: action.payload.order_id,
    };
  }

  if (action.type === 'SET_ORDER_ID') {
    return {
      ...state,
      order_id: initialState.order_id,
    };
  }

  if (action.type === 'AUTH_LOGOUT') {
    return initialState;
  }

  return state;
};

export default authReducer;

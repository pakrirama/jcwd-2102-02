const initialState = {
  id: null,
  address: '',
  city: '',
  province: '',
  postal_code: '',
  id_user: null,
  city_id: '',
  courier: null,
  cost: 0,
  service: '',
  etd: null,
  description: '',
};

const addressReducer = (state = initialState, action) => {
  if (action.type === 'SET_ADDRESS') {
    return {
      ...state,
      id: action.payload.id,
      address: action.payload.address,
      city: action.payload.city,
      province: action.payload.province,
      postal_code: action.payload.postal_code,
      id_user: action.payload.id_user,
      city_id: action.payload.city_id,
    };
  }
  if (action.type === 'SET_COURIER') {
    return {
      ...state,
      courier: action.payload.courier,
      cost: action.payload.cost,
      service: action.payload.service,
      etd: action.payload.etd,
      description: action.payload.description,
    };
  }
  if (action.type === 'UNSET_COURIER') {
    return {
      ...state,
      courier: initialState.courier,
      cost: initialState.cost,
      service: initialState.service,
      etd: initialState.etd,
      description: initialState.description,
    };
  }
  if (action.type === 'UNSET_ADDRESS') {
    return initialState;
  }
  return state;
};

export default addressReducer;

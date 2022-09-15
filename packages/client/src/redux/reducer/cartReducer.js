const initialState = {
  id_cart: 0,
  total_cart: 0,
  total_price: 0,
  render: false,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === 'SET_CART') {
    return {
      ...state,
      id_cart: action.payload.id_cart,
      total_cart: action.payload.total_cart,
      total_price: action.payload.total_price,
      render: action.payload.render,
    };
  }
  if (action.type === 'UNSET_CART') {
    return initialState;
  }
  return state;
};

export default cartReducer;

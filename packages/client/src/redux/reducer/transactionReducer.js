const initialState = {
  tab: 'ongoing',
};

const transactionReducer = (state = initialState, action) => {
  if (action.type === 'SET_TRANSACTION_TAB') {
    return {
      ...state,
      tab: action.payload.tab,
    };
  }
  if (action.type === 'UNSET_TRANSACTION_TAB') {
    return {
      ...state,
      tab: initialState.tab,
    };
  }
  return state;
};

export default transactionReducer;

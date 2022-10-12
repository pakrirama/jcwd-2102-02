const initialState = {
  status: '',
  no_invoice: '',
  order: '',
  orderby: '',
  datefrom: '',
  dateto: '',
  offset: 0,
  render: false,
};

const transactionReducer = (state = initialState, action) => {
  if (action.type === 'SET_TRANSACTION_FILTER') {
    return {
      status: action.payload.status,
      no_invoice: action.payload.no_invoice,
      order: action.payload.order,
      orderby: action.payload.orderby,
      datefrom: action.payload.datefrom,
      dateto: action.payload.dateto,
      offset: action.payload.offset,
      render: action.payload.render,
    };
  }
  if (action.type === 'UNSET_TRANSACTION_FILTER') {
    return initialState;
  }
  return state;
};

export default transactionReducer;

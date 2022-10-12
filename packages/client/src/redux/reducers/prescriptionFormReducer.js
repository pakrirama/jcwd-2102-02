const initialState = {
  medicine: [
    {
      label: '',
      id: '',
      productName: '',
      primaryPrice: 0,
      primaryUnit: '',
      secondaryUnit: '',
      quantity: 0,
    },
  ],
  compound: [
    {
      label: '',
      id: '',
      productName: '',
      primaryPrice: 0,
      primaryUnit: '',
      secondaryUnit: '',
      quantity: 0,
    },
  ],
};

const prescriptionFormReducer = (state = initialState, action) => {
  if (action.type === 'SET_PRESCRIPTION_FORM') {
    return {
      ...state,
      medicine: action.payload.medicine,
      compound: action.payload.compound,
    };
  }
  if (action.type === 'UNSET_PRESCRIPTION_FORM') {
    return {
      medicine: [
        {
          label: '',
          id: '',
          productName: '',
          primaryPrice: 0,
          primaryUnit: '',
          secondaryUnit: '',
          quantity: 0,
        },
      ],
      compound: [
        {
          label: '',
          id: '',
          productName: '',
          primaryPrice: 0,
          primaryUnit: '',
          secondaryUnit: '',
          quantity: 0,
        },
      ],
    };
  }
  return state;
};

export default prescriptionFormReducer;

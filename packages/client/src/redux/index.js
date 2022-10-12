import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import renderReducer from './reducers/renderReducer';
import addressReducer from './reducers/addressReducer';
import filterReducer from './reducers/filterReducer';
import cartReducer from './reducers/cartReducer';
import transactionReducer from './reducers/transactionReducer';
import prescriptionFormReducer from './reducers/prescriptionFormReducer';

const rootReducer = combineReducers({
  authReducer,
  renderReducer,
  addressReducer,
  filterReducer,
  cartReducer,
  transactionReducer,
  prescriptionFormReducer,
});

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import renderReducer from './reducer/renderReducer';
import addressReducer from './reducer/addressReducer';
import filterReducer from './reducer/filterReducer';
import cartReducer from './reducer/cartReducer';
import transactionReducer from './reducer/transactionReducer';

const rootReducer = combineReducers({
  authReducer,
  renderReducer,
  addressReducer,
  filterReducer,
  cartReducer,
  transactionReducer,
});

export default rootReducer;

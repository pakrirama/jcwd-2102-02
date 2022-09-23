import { combineReducers } from '@reduxjs/toolkit';
// import authReducer from './reducer/authReducer';
import authReducer from './reducer/authReducer';
import renderReducer from './reducer/renderReducer';
import addressReducer from './reducer/addressReducer';
import filterReducer from './reducer/filterReducer';
import cartReducer from './reducer/cartReducer';
import transactionReducer from './reducer/transactionReducer';

// import automateRendering from './reducer/render/rendering';
// import auth_reducer from './reducers/auth/auth';

const rootReducer = combineReducers({
  authReducer,
  renderReducer,
  addressReducer,
  filterReducer,
  cartReducer,
  transactionReducer,
});

export default rootReducer;

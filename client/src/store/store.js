import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice from './admin/products-slice/index';
import shopProductSlice from './shop/products-slice/index';

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts : adminProductsSlice,
    shopProducts : shopProductSlice,
  }
});

export default store;
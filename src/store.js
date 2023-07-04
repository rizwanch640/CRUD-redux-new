import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './Redux/Crud';

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

export default store;

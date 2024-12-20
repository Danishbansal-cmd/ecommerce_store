import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../store/authslice';
import rolesSlice from '../store/rolesSlice';
import departmentsSlice from '../store/departmentSlice';
import productsSlice from '../store/productSlice';

const store = configureStore({
    reducer : {
        auth : authSlice,
        roles : rolesSlice,
        departments : departmentsSlice,
        products : productsSlice
    }
});

export default store;


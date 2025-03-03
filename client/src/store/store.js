import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../store/authslice';
import rolesSlice from '../store/rolesSlice';
import departmentsSlice from '../store/departmentSlice';
import productsSlice from '../store/productSlice';
import bannerSlice from '../store/bannerSlice';
import categorySlice from '../store/categorySlice';
import brandSlice from '../store/brandSlice';

const store = configureStore({
    reducer : {
        auth : authSlice,
        roles : rolesSlice,
        departments : departmentsSlice,
        products : productsSlice,
        banners : bannerSlice,
        categories : categorySlice,
        brands : brandSlice
    }
});

export default store;


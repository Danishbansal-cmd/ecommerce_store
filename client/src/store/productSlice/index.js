import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true,
    productList : null
}

export const addProduct = createAsyncThunk('addProduct', async (formData) => {
    const response = await axios.post('http://localhost:5000/api/v1/product/add', formData, {
        withCredentials : true
    });
    return response.data;
})

export const getAllProduct = createAsyncThunk('getAllProduct', async () => {
    const response = await axios.get('http://localhost:5000/api/v1/product/getall', {
        withCredentials : true
    });
    return response.data;
})

export const deleteProduct = createAsyncThunk('deleteProduct', async ({productId}) => {
    const response = await axios.delete(`http://localhost:5000/api/v1/product/delete/${productId}`);
    return response.data;
})

export const editProduct = createAsyncThunk('editProduct', async ({formData, productId}) => {
    console.log(formData,'editProduct aysncThunk formData')
    console.log(productId,'editProduct aysncThunk productId')
    const response = await axios.put(`http://localhost:5000/api/v1/product/update/${productId}`, formData, {
        withCredentials : true
    });
    return response.data;
})

const productSlice = createSlice({
    name : 'productSlice',
    initialState,
    extraReducers : (builder) => builder.addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data
    })
    .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = true;
        state.productList = null;
    })
})


export default productSlice.reducer;



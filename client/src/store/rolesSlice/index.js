import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true,
    rolesList : [],
    specificRole : null
}

export const getAllRoles = createAsyncThunk('/getAllRoles', async () => {
    const response = await axios.get('http://localhost:5000/api/v1/role/getall', {
        withCredentials : true
    })
    return response.data;
})

export const getRole = createAsyncThunk('/getRole', async ({role}) => {
    const response = await axios.post('http://localhost:5000/api/v1/role/get', {role},{
        withCredentials : true
    })
    return response.data;
})


const rolesSlice = createSlice({
    name : 'rolesSlice',
    initialState,
    extraReducers : (builder) => builder.addCase(getAllRoles.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getAllRoles.fulfilled, (state,action) => {
        state.isLoading = false;
        state.rolesList = action?.payload?.data.length >= 1 ? action?.payload?.data : [];
    })
    .addCase(getAllRoles.rejected, (state,action) => {
        state.isLoading = true;
        state.rolesList = [];
    })
    .addCase(getRole.pending, (state,action) => {
        state.isLoading = true;
        state.specificRole = null
    })
    .addCase(getRole.fulfilled, (state,action) => {
        console.log(action,'getrole action')
        state.isLoading = false;
        state.specificRole = action?.payload?.data;
    })
    .addCase(getRole.rejected, (state,action) => {
        state.isLoading = true;
        state.specificRole = null;
    })
})

export default rolesSlice.reducer;


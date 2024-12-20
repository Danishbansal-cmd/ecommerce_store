import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : true,
    departmentList : [],
    specificDepartment : null
}

export const getAllDepartments = createAsyncThunk('/getAllDepartments', async () => {
    const response = await axios.get('http://localhost:5000/api/v1/department/getall',{withCredentials : true});
    return response.data;
})

const departmentSlice = createSlice({
    name : 'departmentSlice',
    initialState,
    extraReducers : (builder) => builder.addCase(getAllDepartments.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getAllDepartments.fulfilled, (state,action) => {
        state.isLoading = false;
        state.departmentList = action?.payload?.data.length >= 1 ? action?.payload?.data : [];
    })
    .addCase(getAllDepartments.rejected, (state) => {
        state.isLoading = false;
        state.departmentList = [];
    })
})


export default departmentSlice.reducer;
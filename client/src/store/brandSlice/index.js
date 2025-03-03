import axiosInstance from "@/common/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    brands : [],    
    loading : false,
    error : null
}

export const getAllBrands = createAsyncThunk("brands/getAllBrands", async () => {
    try{
        const response = await axiosInstance.get("/brand/getall", {
            withCredentials : true,
            validateStatus: () => true
        })
        if(response.status === 200){
            return response.data
        }else{
            // rejectWithValue used to reject the promise with the custom payload or the error message
            return rejectWithValue(
                response.data || { message: "Unknown error occurred" }
            );
        }
    }catch(error){
        return rejectWithValue(
            error.response?.data || {
              message: `Network error, please try again. ${error.message}`,
            }
        );
    }
})

const brandSlice = createSlice({
   name : "brands",
   initialState,
   extraReducers : (builder) => {
    builder.addCase(getAllBrands.pending, (state) => {
        state.loading = true
    })
    builder.addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false
        state.brands = action.payload
    })  
    builder.addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
   } 
})

export default brandSlice.reducer;

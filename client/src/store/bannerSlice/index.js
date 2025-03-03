import axiosInstance from "@/common/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    banners: [],
    loading: false,
    error: null,
}


export const getAllBanners = createAsyncThunk('banner/getAllBanners', async ({bannerType}) => {
    try{
        const response = await axiosInstance.get('/banners/getall', { bannerType }, {
            withCredentials: true,
            validateStatus: () => true,
        });

        if(response.status === 200){
            return response.data
        }else{
            // rejectWithValue used to reject the promise with the custom payload or the error message
            return rejectWithValue(response.data || { message: "Unknown error occurred" });
        }
    }catch(error){
        return rejectWithValue(error.response?.data || { message: `Network error, please try again. ${error.message}` })
    }
})


const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllBanners.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllBanners.fulfilled, (state, action) => {
            state.loading = false;
            state.banners = action.payload;
        })
        .addCase(getAllBanners.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;


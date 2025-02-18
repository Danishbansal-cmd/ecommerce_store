import axiosInstance from "@/common/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";




export const orderStatusesAll = createAsyncThunk('orderStatusesAll', async () => {
    async ({ rejectWithValue }) => {
        try {
          const response = await axiosInstance.get(
            "/order/status/getall",
            {
              withCredentials: true,
              validateStatus: () => true, // ✅ This ensures Axios does NOT throw an error for 400 responses
            }
          );
    
          return (response.status === 200) ? response.data : rejectWithValue(response.data || { message: "Unknown error occurred" }); 
        } catch (error) {
          return rejectWithValue(
            error.response?.data || { message: "Network error, please try again." }
          );
        }
      }
});
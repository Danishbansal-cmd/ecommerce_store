import axiosInstance from "@/common/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async () => {
    try {
      const response = await axiosInstance.get("/category/getall", {
        withCredentials: true,
        validateStatus: () => true,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        // rejectWithValue used to reject the promise with the custom payload or the error message
        return rejectWithValue(
          response.data || { message: "Unknown error occurred" }
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: `Network error, please try again. ${error.message}`,
        }
      );
    }
  }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });

        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default categorySlice.reducer;

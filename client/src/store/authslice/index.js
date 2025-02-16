import axiosInstance from "@/common/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  allUserList : null
}

export const registerUser = createAsyncThunk('registerUser', async ({ username, email, password }) => {
  const response = await axiosInstance.post('/user/register', { username, email, password });
  return response.data;
});

export const createUserByAdmin = createAsyncThunk('createUserByAdmin', async (formData) => {
  const response = await axiosInstance.post('/user/createuser', formData);
  return response.data;
});

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ usernameOrEmail, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/login",
        { usernameOrEmail, password },
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
);


export const logoutUser = createAsyncThunk('logoutUser', async () => {
  const response = await axiosInstance.post('/user/logout', {}, {
    withCredentials: true,
  });
  return response.data;
});

export const checkUser = createAsyncThunk('checkUser', async () => {
  const response = await axiosInstance.get('/user/checkuser', {
    withCredentials: true,
  });
  return response.data;
});

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
  const response = await axiosInstance.get('/user/getallusers', {
    withCredentials: true,
  });
  return response.data;
});

export const deleteUser = createAsyncThunk('deleteUser', async ({userId}) => {
  const response = await axiosInstance.delete(`/user/${userId}`,{
    withCredentials: true,
  });
  return response.data;
});

export const sendEmailVerificationLink = createAsyncThunk('sendEmailVerificationLink', async ({email }) => {
  const response = await axiosInstance.post('/user/sendemailverificationlink', { email });
  return response.data;
});

export const verifyEmail = createAsyncThunk('verifyEmail', async ({token}) => {
  const response = await axiosInstance.get('/user/verifyemail',{params : {token}});
  return response.data;
});

export const sendPasswordResetEmail = createAsyncThunk('sendPasswordResetEmail', async ({email}) => {
  const response = await axiosInstance.post('/user/sendpasswordresetemail',{email});
  return response.data;
});

export const resetPassword = createAsyncThunk('resetPassword', async ({userId,token,password}) => {
  const response = await axiosInstance.post(`/user/resetpassword/${userId}/${token}`,{password});
  return response.data;
});


const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  extraReducers: (builder) => builder
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = state.user?.role === 'admin' ? state.user : null;
      state.isAuthenticated = state.user?.role === 'admin' ? true : false;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = state.user?.role === 'admin' ? state.user : null;
      state.isAuthenticated = state.user?.role === 'admin' ? true : false;
    })
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      console.log(action,'from the auth slice action')
      state.isLoading = false;
      state.user = action?.payload?.data ?? null;
      state.isAuthenticated = action?.payload?.data ? true : false;
    })
    .addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(checkUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(checkUser.fulfilled, (state, action) => {
      console.log(action, '[Login User] from slice fulfilled')
      state.isLoading = false;
      state.user = action?.payload?.data ?? null;
      state.isAuthenticated = action?.payload?.data ? true : false;
    })
    .addCase(checkUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(getAllUsers.pending, (state) => {
      state.allUserList = null;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUserList = action?.payload?.data;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.allUserList = null;
    })
})

export default authSlice.reducer;
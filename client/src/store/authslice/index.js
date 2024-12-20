import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  allUserList : null
}

export const registerUser = createAsyncThunk('registerUser', async ({ username, email, password }) => {
  const response = await axios.post('http://localhost:5000/api/v1/user/register', { username, email, password });
  return response.data;
});

export const sendEmailVerificationLink = createAsyncThunk('sendEmailVerificationLink', async ({email }) => {
  const response = await axios.post('http://localhost:5000/api/v1/user/sendemailverificationlink', { email });
  return response.data;
});

export const verifyEmail = createAsyncThunk('verifyEmail', async ({token}) => {
  const response = await axios.get('http://localhost:5000/api/v1/user/verifyemail',{params : {token}});
  return response.data;
});

export const createUserByAdmin = createAsyncThunk('createUserByAdmin', async (formData) => {
  const response = await axios.post('http://localhost:5000/api/v1/user/createuser', formData);
  return response.data;
});

export const loginUser = createAsyncThunk('loginUser', async ({ usernameOrEmail, password }) => {
  const response = await axios.post('http://localhost:5000/api/v1/user/login', { usernameOrEmail, password }, {
    withCredentials: true,
  });
  return response.data;
});

export const logoutUser = createAsyncThunk('loginUser', async () => {
  const response = await axios.post('http://localhost:5000/api/v1/user/logout', {}, {
    withCredentials: true,
  });
  return response.data;
});

export const checkUser = createAsyncThunk('checkUser', async () => {
  const response = await axios.get('http://localhost:5000/api/v1/user/checkuser', {
    withCredentials: true,
  });
  return response.data;
});

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/v1/user/getallusers', {
    withCredentials: true,
  });
  return response.data;
});

export const deleteUser = createAsyncThunk('deleteUser', async ({userId}) => {
  const response = await axios.delete(`http://localhost:5000/api/v1/user/${userId}`,{
    withCredentials: true,
  });
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
    .addCase(loginUser.rejected, (state, action) => {
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
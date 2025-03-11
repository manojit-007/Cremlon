import apiClient from "@/ApiClient/ApiClient.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      localStorage.setItem("token", response.data.token);
      console.log(response);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to register user"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/logIn", credentials, {
        withCredentials: true,
      });
      console.log(response.data);
      //save token to local storage
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const getAdmin = createAsyncThunk(
  "auth/isAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Admin not logged in.");
      }

      const response = await apiClient.get("/auth/me", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("token", response.data.token);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post("/auth/logout", {}, { withCredentials: true });
      localStorage.setItem("token", "");

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        "/auth/forgetPassword",
        { email },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ resetToken, password }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(
        `/auth/password/reset/${resetToken}`,
        { password },
        { withCredentials: true }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAdmin: false,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
    resetUserDetails(state) {
      state.userDetails = null;
    },
    resetSuccess(state) {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state,action) => {
        state.isAdmin = true;
        state.successMessage = action.payload; 
        state.loading = false;
        state.error = null; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAdmin = false;
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAdmin = true;
        state.user = action.payload.user ;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAdmin = false;
        state.loading = false;
        state.error = action.payload;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending,(state)=>{
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isAdmin = true;
        state.loading = false;
        state.successMessage = action.payload
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isAdmin = false;
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAdmin = false;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, resetSuccess,resetUserDetails } = AuthSlice.actions;

export default AuthSlice.reducer;

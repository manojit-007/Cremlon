import apiClient from "@/ApiClient/ApiClient.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for fetching all services
export const getAllServices = createAsyncThunk(
  "service/getAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`service/allService`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data.data; // Assuming the API returns a list of services
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);

// Service slice
const ServiceSlice = createSlice({
  name: "service",
  initialState: {
    services: null, // List of services
    loading: false, // Loading state
    error: null, // Error message
    successMessage: null, // Success message for actions
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all services
      .addCase(getAllServices.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

// Exporting actions and reducer
export const { resetError, resetSuccess } = ServiceSlice.actions;
export default ServiceSlice.reducer;

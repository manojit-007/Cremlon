import apiClient from "@/ApiClient/ApiClient.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for fetching all services
export const getAllPosts = createAsyncThunk(
  "post/getAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`post/allPosts`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);

export const addNewPost = createAsyncThunk(
    "post/addNewPost",
    async (postData, { rejectWithValue }) => {
      try {
        const response = await apiClient.post(`post/newPost`, postData, {
          withCredentials: true,
        });
        return response.data; 
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to add new post"
        );
      }
    }
)

// Service slice
const PostSlice = createSlice({
    name: "post",
    initialState: {
      postsData: [], // Ensure it starts as an empty array
      loading: false,
      error: null,
      successMessage: null,
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
        .addCase(getAllPosts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.postsData = action.payload || []; // Ensure postsData is always an array
        })
        .addCase(getAllPosts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
// Exporting actions and reducer
export const { resetError, resetSuccess } = PostSlice.actions;
export default PostSlice.reducer;

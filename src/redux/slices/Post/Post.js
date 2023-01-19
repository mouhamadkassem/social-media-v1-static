import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/baseUrl";

export const fetchPostsAction = createAsyncThunk(
  "fetch/posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = JSON.parse(localStorage.getItem("user-auth")).token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(`${baseUrl}/posts/fetch-all`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const fetchPostDetailsAction = createAsyncThunk(
  "fetch/post-details",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = JSON.parse(localStorage.getItem("user-auth")).token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `${baseUrl}/posts/fetch-post/${payload}`,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createPostAction = createAsyncThunk(
  "create/post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = JSON.parse(localStorage.getItem("user-auth")).token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append("description", payload.description);
    formData.append("image", payload.image);

    try {
      const { data } = await axios.post(
        `${baseUrl}/posts/create`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const likesAction = createAsyncThunk(
  "like/post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = JSON.parse(localStorage.getItem("user-auth")).token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}/posts/like`,
        { id: payload },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const dislikesAction = createAsyncThunk(
  "dislike/post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = JSON.parse(localStorage.getItem("user-auth")).token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}/posts/dislike`,
        { id: payload },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const deletePostAction = createAsyncThunk(
  "delete/post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = JSON.parse(localStorage.getItem("user-auth")).token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.delete(
        `${baseUrl}/posts/delete-post/${payload}`,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const UpdatePostAction = createAsyncThunk(
  "update/post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = JSON.parse(localStorage.getItem("user-auth")).token;

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append("image", payload?.image);
    formData.append("description", payload?.description);

    try {
      const { data } = await axios.put(
        `${baseUrl}/posts/update-post/${payload?.postId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(likesAction.pending, (state, action) => {
      state.loadLike = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(likesAction.fulfilled, (state, action) => {
      state.loadLike = false;
      state.postLike = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(likesAction.rejected, (state, action) => {
      state.loadLike = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(dislikesAction.pending, (state, action) => {
      state.laodDislike = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(dislikesAction.fulfilled, (state, action) => {
      state.laodDislike = false;
      state.postLike = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(dislikesAction.rejected, (state, action) => {
      state.laodDislike = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.newPost = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postDeleted = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(UpdatePostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(UpdatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(UpdatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default postSlice.reducer;

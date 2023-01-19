import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/baseUrl";

export const joinChatAction = createAsyncThunk(
  "join/chat",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { id, token } = JSON.parse(localStorage.getItem("user-auth"));

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/chat/create`,
        { id: payload },
        config
      );

      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(joinChatAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(joinChatAction.fulfilled, (state, action) => {
      state.loading = false;
      state.chat = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(joinChatAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default chatSlice.reducer;

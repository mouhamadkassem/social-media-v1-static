import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/baseUrl";

export const createMessageAction = createAsyncThunk(
  "create/message",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { token } = JSON.parse(localStorage.getItem("user-auth"));

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/message/send`,
        { content: payload.content, chatId: payload.chatId },
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

const messageSlice = createSlice({
  name: "message",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createMessageAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createMessageAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createMessageAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
  },
});

export default messageSlice.reducer;

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import axios from "axios";
import baseUrl from "../../../utlis/baseUrl";

const redirectAction = createAction("redirect");

export const addProductAction = createAsyncThunk(
  "/add-product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { token } = JSON.parse(localStorage.getItem("user-auth"));

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const formData = new FormData();

    formData.append("images", payload?.images[0]);
    formData.append("images", payload?.images[1]);
    formData.append("images", payload?.images[2]);
    formData.append("title", payload?.title);
    formData.append("desc", payload?.desc);
    formData.append("category", payload?.category);
    formData.append("price", payload?.price);
    formData.append("phoneNum", payload?.phoneNum);
    formData.append("condition", payload?.condition);

    try {
      const { data } = axios.post(`${baseUrl}/product`, formData, config);

      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchProductAction = createAsyncThunk(
  "fecth-products",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { token } = JSON.parse(localStorage.getItem("user-auth"));

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/product`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const categoryProductAction = createAsyncThunk(
  "category-products",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { token } = JSON.parse(localStorage.getItem("user-auth"));

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseUrl}/product/category?category=${payload}`,
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
export const productDetailsAction = createAsyncThunk(
  "product-details",

  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { token } = JSON.parse(localStorage.getItem("user-auth"));

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `${baseUrl}/product/details/${payload}`,
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
export const productViewedAction = createAsyncThunk(
  "product-viewed",

  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { token } = JSON.parse(localStorage.getItem("user-auth"));

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}/product/views/${payload}`,
        payload,
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

export const addRatingAction = createAsyncThunk(
  "add-rating",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { token } = JSON.parse(localStorage.getItem("user-auth"));

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}/product/rating`,
        {
          newRating: payload.newRating,
          productId: payload.id,
        },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const deleteProductAction = createAsyncThunk(
  "delete-product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { token } = JSON.parse(localStorage.getItem("user-auth"));

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.delete(
        `${baseUrl}/product/${payload}`,
        config
      );
      dispatch(redirectAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        return error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const MarketSlice = createSlice({
  name: "Market",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(addProductAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.NewProduct = action?.meta?.arg;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addProductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(fetchProductAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(categoryProductAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(categoryProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(categoryProductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(productDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(productDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.productDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(productDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(productViewedAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(productViewedAction.fulfilled, (state, action) => {
      state.loading = false;
      state.productViewed = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(productViewedAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(addRatingAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addRatingAction.fulfilled, (state, action) => {
      state.loading = false;
      state.rating = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addRatingAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    builder.addCase(deleteProductAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(redirectAction, (state, action) => {
      state.productDeleted = true;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.productDeleted = false;
      state.productDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default MarketSlice.reducer;

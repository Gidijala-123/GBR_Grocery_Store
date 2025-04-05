import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create authenticated axios instance
const authAxios = axios.create({
  baseURL: "/api",
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/cart");
      return response.data.items || [];
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Please login to view your cart");
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await authAxios.post("/cart", { productId, quantity });
      return response.data.items;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        return rejectWithValue("Session expired. Please login again");
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }) => {
    const response = await axios.put(`/api/cart/${itemId}`, { quantity });
    return response.data.items;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId) => {
    await axios.delete(`/api/cart/${itemId}`);
    return itemId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};

export const selectCartCount = (state) => {
  return state.cart.items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
};

export default cartSlice.reducer;

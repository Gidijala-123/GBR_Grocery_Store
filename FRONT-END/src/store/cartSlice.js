import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for API operations
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cart/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async ({ userId, productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/cart/add", {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeFromCartAPI = createAsyncThunk(
  "cart/removeFromCartAPI",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/cart/remove", {
        userId,
        productId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Local state reducers (for optimistic updates)
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }

      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
    },
    deleteItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      state.items = state.items.filter((item) => item.id !== id);
      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.totalPrice;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
        state.totalQuantity =
          action.payload.items?.reduce((sum, item) => sum + item.quantity, 0) ||
          0;
        state.totalAmount =
          action.payload.items?.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ) || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      })

      // Add to Cart
      .addCase(addToCartAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update state based on API response
        const updatedCart = action.payload;
        state.items = updatedCart.items.map((item) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity,
        }));
        state.totalQuantity = updatedCart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalAmount = updatedCart.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      })
      .addCase(addToCartAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      })

      // Remove from Cart
      .addCase(removeFromCartAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCart = action.payload;
        state.items = updatedCart.items.map((item) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity,
        }));
        state.totalQuantity = updatedCart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalAmount = updatedCart.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      })
      .addCase(removeFromCartAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

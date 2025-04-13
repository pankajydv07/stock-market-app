import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Async thunks
export const fetchAllStocks = createAsyncThunk(
  'stocks/fetchAll',
  async () => {
    const response = await axios.get(`${API_URL}/stocks`);
    return response.data;
  }
);

export const fetchStockPrice = createAsyncThunk(
  'stocks/fetchPrice',
  async (stockId) => {
    const response = await axios.get(`${API_URL}/stocks/${stockId}/price`);
    return response.data;
  }
);

export const fetchStockDetails = createAsyncThunk(
  'stocks/fetchDetails',
  async (stockId) => {
    const response = await axios.get(`${API_URL}/stocks/${stockId}`);
    return response.data;
  }
);

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    companies: [],
    prices: {},
    selectedStock: null,
    loading: {
      companies: false,
      prices: {},
      details: false
    },
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchAllStocks
      .addCase(fetchAllStocks.pending, (state) => {
        state.loading.companies = true;
      })
      .addCase(fetchAllStocks.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.loading.companies = false;
      })
      .addCase(fetchAllStocks.rejected, (state, action) => {
        state.loading.companies = false;
        state.error = action.error.message;
      })
      
      // Handle fetchStockPrice
      .addCase(fetchStockPrice.pending, (state, action) => {
        state.loading.prices[action.meta.arg] = true;
      })
      .addCase(fetchStockPrice.fulfilled, (state, action) => {
        state.prices[action.payload.id] = action.payload.price;
        state.loading.prices[action.payload.id] = false;
      })
      .addCase(fetchStockPrice.rejected, (state, action) => {
        state.loading.prices[action.meta.arg] = false;
        state.error = action.error.message;
      })
      
      // Handle fetchStockDetails
      .addCase(fetchStockDetails.pending, (state) => {
        state.loading.details = true;
      })
      .addCase(fetchStockDetails.fulfilled, (state, action) => {
        state.selectedStock = action.payload;
        state.loading.details = false;
      })
      .addCase(fetchStockDetails.rejected, (state, action) => {
        state.loading.details = false;
        state.error = action.error.message;
      });
  }
});

export default stockSlice.reducer;

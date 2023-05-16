import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { locationsApi, useDetailQuery } from "../services";
import Constants from "expo-constants";

const locations = createSlice({
  name: "locations",
  initialState: {
    search: [],
    items: [],
    loading: "idle",
  },
  reducers: {
    clearPlaces: (state, action) => {
      state.items = [];
      state.search = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      locationsApi.endpoints.getLocations.matchFulfilled,
      (state, action) => {
        const ids = action.payload.map((item) => item.location_id);

        state.search = ids;
      }
    );

    builder.addMatcher(
      locationsApi.endpoints.getLocations.matchPending,
      (state, action) => {
        state.loading = "pending";
      }
    );
    builder.addMatcher(
      locationsApi.endpoints.details.matchFulfilled,
      (state, action) => {
        state.loading = "idle";
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      locationsApi.endpoints.details.matchRejected,
      (state, action) => {
        state.loading = "error";
        state.items = action.payload;
      }
    );
  },
});
export const { clearPlaces } = locations.actions;
export default locations.reducer;

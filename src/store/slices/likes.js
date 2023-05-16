import { createSlice } from "@reduxjs/toolkit";

const likes = createSlice({
  name: "likes",
  initialState: {
    likes: [],
  },
  reducers: {
    addLike: (state, action) => {
      const placeExist = state.likes.findIndex(
        (item) => item.location_id === action.payload.location_id
      );

      console.log(placeExist);

      if (placeExist === -1) {
        state.likes.push(action.payload);
      }
    },
    clearLikes: (state, action) => {
      state.likes = [];
    },
  },
});

export const { addLike, clearLikes } = likes.actions;
export default likes.reducer;

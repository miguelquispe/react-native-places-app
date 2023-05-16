import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const facebookToken = createAsyncThunk("facebook/token", async () => {
  // console.log("first");
  try {
    let tokenValue = await AsyncStorage.getItem("@fb_token");

    console.log({ tokenValue });

    return tokenValue;
  } catch (error) {
    console.log(error);
  }
});

const auth = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    facebookLoginSuccess: (state, action) => {
      state.token = action.payload;
    },
    facebookLoginFailure: (state, action) => {
      // console.log("facebookLoginFailure");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(facebookToken.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.token = action.payload;
    });
  },
});

// export const { facebookLogin } = fbLogin.actions;
export const { facebookLoginSuccess, facebookLoginFailure } = auth.actions;
export default auth.reducer;

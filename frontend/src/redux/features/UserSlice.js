import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
  isverified:false,


};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
      state.isverified = action.payload.isverified;
    }
  },
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;
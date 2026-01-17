import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:{}

};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
      console.log(action);
      
    }
  },
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;
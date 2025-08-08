import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  speed: 50,
};

const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    useChangeSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
  },
});

export const { useChangeSpeed } = typeSlice.actions;

export default typeSlice.reducer;

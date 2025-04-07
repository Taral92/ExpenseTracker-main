import { createSlice } from "@reduxjs/toolkit";

export const expenseslice = createSlice({
  name: "expense",
  initialState: {
    category: "",
    MarkasDone: "",
  },
  reducers: {
    setcategory: (state, action) => {
      state.category = action.payload;
    },
    setmarkasdone: (state, action) => {
      state.MarkasDone = action.payload;
    },
  },
});
export const { setcategory } = expenseslice.actions;
export default expenseslice.reducer;

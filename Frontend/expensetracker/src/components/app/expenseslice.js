import { createSlice } from "@reduxjs/toolkit";

export const expenseslice = createSlice({
  name: "expenses",
  initialState: {
    category: "",
    MarkasDone: "",
    expenses:[]
  },
  reducers: {
    setcategory: (state, action) => {
      state.category = action.payload;
    },
    setmarkasdone: (state, action) => {
      state.MarkasDone = action.payload;
    },
    setexpenses:(state,action)=>{
      state.expenses=action.payload
    }
  },
});
export const { setcategory,setmarkasdone,setexpenses } = expenseslice.actions;
export default expenseslice.reducer;

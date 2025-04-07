import { createSlice } from "@reduxjs/toolkit";

export const expenseslice = createSlice({
  name: "expense",
  initialState: {
   category:''
  },
  reducers: {
    setcategory:(state,action)=>{
     state.category=action.payload
    }
  },
});
export const {setcategory} = expenseslice.actions;
export default expenseslice.reducer;
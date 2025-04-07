import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "z",
  initialState: {
    loading:false,
    user:null
  },
  reducers: {
    setloading:(state,action)=>{
      state.loading=action.payload
    },
    authuser:(state,action)=>{
      state.user=action.payload
    }
  },
});
export const {setloading,authuser} = Slice.actions;
export default Slice.reducer;
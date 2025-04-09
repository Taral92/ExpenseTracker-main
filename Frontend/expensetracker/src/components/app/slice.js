import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "z",
  initialState: {
    loading:false,
    user:null,
    selectedexpense:null
  },
  reducers: {
    setloading:(state,action)=>{
      state.loading=action.payload
    },
    authuser:(state,action)=>{
      state.user=action.payload
    },
    setselectedexpense:(state,action)=>{
      state.selectedexpense=action.payload;
    }
  },
});
export const {setloading,authuser,setselectedexpense} = Slice.actions;
export default Slice.reducer;
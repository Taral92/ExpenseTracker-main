import { configureStore } from "@reduxjs/toolkit";
import z from './slice'
import expenseslice from "./expenseslice";

 const store = configureStore({
   reducer:{
    z:z,
    expenseslice:expenseslice
   }
});

export default store;
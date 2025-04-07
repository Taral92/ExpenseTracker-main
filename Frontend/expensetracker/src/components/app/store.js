import { configureStore } from "@reduxjs/toolkit";
import z from './slice'
import expenses from "./expenseslice";

 const store = configureStore({
   reducer:{
    z:z,
    expenseslice:expenses
   }
});

export default store;
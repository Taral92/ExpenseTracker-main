import { configureStore } from "@reduxjs/toolkit";
import z from './slice'
import expenseslice from "./expenseslice";

 const store = configureStore({
   reducer:z,
   expense:expenseslice
});

export default store;
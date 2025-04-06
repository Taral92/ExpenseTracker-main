import React from "react";
import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { Toaster } from "@/components/ui/sonner"

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
const App = () => {
  return (
    <div className="">
    
      <RouterProvider router={approuter} />
      <Toaster/>
    </div>
  );
};

export default App;

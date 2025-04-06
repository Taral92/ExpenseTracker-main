import React, { useState } from "react";
import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
const Login = () => {
  const navigate=useNavigate()
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const handlesubmit = async(e) => {
    try {
      e.preventDefault();
      const res=await axios.post('http://localhost:9000/api/user/login',input,{
       headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/')
      }else{
        toast.error(res.data.message || "invalid credentials")
      }
    } catch (error) {
      console.log(error);
      
    }
    
  };

  return (
    <div className="flex bg- flex-cols items-center justify-center w-screen min-h-screen">
      <form onSubmit={handlesubmit} className="shadow-lg w-100 p-10 rounded-md">
        <div className="flex w-full justify-center">
          <Logo />
        </div>

        <div>
          <label className="font-bold">
            email
          </label>
          <input
            name="email"
            onChange={handlechange}
            value={input.email}
            placeholder="enter your email"
            className="w-full placeholder-gray-300 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
            type="email"
          />
        </div>
        <div>
          <label className="font-bold">password</label>
          <input
            name="password"
            onChange={handlechange}
            value={input.password}
            placeholder="enter your password"
            className="w-full px-4 placeholder-gray-300 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
          />
        </div>
        <div className=" my-5">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p>
            don't have account ?
            <Link className="text-blue-300 mx-1" to={"/signup"}>
             signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

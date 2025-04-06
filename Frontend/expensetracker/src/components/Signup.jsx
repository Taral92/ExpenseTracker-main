import React, { useState } from "react";
import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster,toast } from "sonner";

const Signup = () => {
  const navigate=useNavigate()
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:9000/api/user/register", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login')
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
          <label className="font-bold">name</label>
          <input
            name="fullname"
            onChange={handlechange}
            value={input.fullname}
            placeholder="enter your name"
            className="w-full  placeholder-gray-300 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
          ></input>
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
            Signup
          </Button>
          <p>
            alredy have account ?{" "}
            <Link className="text-blue-300 mx-1" to={"/login"}>
              login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;


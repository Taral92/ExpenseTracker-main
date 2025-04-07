import React from "react";
import Navbar from "./Navbar";
import Logo from "./shared/Logo";
import Createexpense from "./Createexpense";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useDispatch } from "react-redux";
import { setcategory, setmarkasdone } from "./app/expenseslice";
import Expensetable from "./Expensetable";
import Usegetexpenses from "@/hooks/Usegetexpenses";


const Home = () => {
    Usegetexpenses()
  const dispatch=useDispatch()
  const changecategoryhandler=(value)=>{
     dispatch(setcategory(value))
  }
  const changeDonehandler=(value)=>{
    dispatch(setmarkasdone(value))
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>
         <div className="flex py-2 items-center justify-between mr-2">
         <div className="py-3 mx-5">
        <Createexpense />
      </div>
      <div className="flex gap-2 my-5 ml-2">
      <h1 className="font-medium text-lg">Filter by : </h1>
      <Select onValueChange={changecategoryhandler}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rent">rent</SelectItem>
          <SelectItem value="food">food</SelectItem>
          <SelectItem value="study">study</SelectItem>
          <SelectItem value="all">all</SelectItem>
          <SelectItem value="others">others</SelectItem>
          <SelectItem value="health">health</SelectItem>
          <SelectItem value="transportation">transportation</SelectItem>
          <SelectItem value="bill">bills</SelectItem>
          <SelectItem value="shopping">shopping</SelectItem>
          <SelectItem value="onlyfans">onlyfans</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={changeDonehandler}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Mark as Done" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Done">Done</SelectItem>
          <SelectItem value="Undone">Undone</SelectItem>
          <SelectItem value="Both">Both</SelectItem>
         
        </SelectContent>
      </Select>

      </div>
         
         </div>
         <div>
         <Expensetable/>
         </div>
    </div>
  );
};

export default Home;

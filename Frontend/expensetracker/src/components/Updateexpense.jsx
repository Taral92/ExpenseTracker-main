import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Edit2, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector} from "react-redux";
import { setexpenses } from "./app/expenseslice";
import { setselectedexpense } from "./app/slice";


function Updateexpense({expense}) {
  const {expenses,selectedexpense}=useSelector(store=>store.expenseslice)
  const [formdata, setformdata] = useState({
    description:expenses?.description,
    amount: expenses?.amount,
    category: expenses?.category,
  });
  const [loading, setloading] = useState(false);
  const [isopen, setopen] = useState(false);
  const dispatch=useDispatch()
  useEffect(()=>{
       
  },[selectedexpense])

  const changehandler = (e) => {
   const {name,value}=e.target
   setformdata((pre)=>({
     ...pre,
     [name]:value
   }))}
  const changecategoryhandler = (value) => {
    setformdata((pre) => ({
      ...pre,
      category: value,
    }));
  };
  const submithandler = async (e) => {
      
    e.preventDefault();
    console.log(formdata);
    try {
      const res = await axios.put(
        `http://localhost:9000/api/user/update/${expense._id}`,
        formdata,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
   
      setformdata({
        description: "",
        amount: null,
        category: "",
      })
         
      

      if (res.data.success) {
        const updatedexpenses = expenses.map((exp) =>
          exp._id === expense._id ? res.data.expense : exp
        );
        dispatch(setexpenses(updatedexpenses));
        toast.success(res.data.message || "Updated successfully");
        setopen(false);
      }
       else {
        toast.error("failed to send data to sevrer");
      }
      setloading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <Dialog className="p-5" open={isopen} onOpenChange={setopen}>
        <DialogTrigger>
          <Button className="rounded-full text-white " onClick={()=>{
            dispatch(setselectedexpense(expense))
          setopen(false)
          }}></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update your expenses here</DialogTitle>
            <DialogDescription>Damn… track it for me pls 😂</DialogDescription>
          </DialogHeader>
          <form onSubmit={submithandler}>
            <div>
              <Label>Description</Label>
            </div>
            <div>
              <Input
                onChange={changehandler}
                value={formdata.description}
                name="description"
                id="description"
                placeholder="description"
                className="cols-span-3"
              ></Input>
            </div>
            <div>
              <div>
                <div className="py-3">
                  <Label>Amount</Label>
                </div>
                <div>
                  <div>
                    <Input
                      onChange={changehandler}
                      value={formdata.amount}
                      name="amount"
                      id="amount"
                      placeholder="Enter in ₹"
                      className="cols-span-3"
                    ></Input>
                  </div>
                </div>
                <div className="py-3">
                  <Select onValueChange={changecategoryhandler}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="expense category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">rent</SelectItem>
                      <SelectItem value="food">food</SelectItem>
                      <SelectItem value="study">study</SelectItem>
                      <SelectItem value="girls">girls</SelectItem>
                      <SelectItem value="others">others</SelectItem>
                      <SelectItem value="health">health</SelectItem>
                      <SelectItem value="transportation">
                        transportation
                      </SelectItem>
                      <SelectItem value="bill">bills</SelectItem>
                      <SelectItem value="shopping">shopping</SelectItem>
                      <SelectItem value="onlyfans">onlyfans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="py-3">
                {loading ? (
                  <Button className="w-full my-3">
                    <Loader2 className="m-2 h-3 animate-spin">
                      plz wait a momemnt
                    </Loader2>
                  </Button>
                ) : (
                  <Button type="submit">Update</Button>
                )}
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Updateexpense;

import React, { useState } from "react";

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
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector} from "react-redux";
import { setexpenses } from "./app/expenseslice";


function Createexpense() {
  const {expenses}=useSelector(store=>store.expenseslice)
  const [formdata, setformdata] = useState({
    description: "",
    amount: null,
    category: "",
  });
  const [loading, setloading] = useState(false);
  const [isopen, setopen] = useState(false);
  const dispatch=useDispatch()

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
      const res = await axios.post(
        "http://localhost:9000/api/user/add",
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
         
      dispatch(setexpenses([...expenses, res.data.expense]));

      if (res.data.success) {
        
        toast.success(res.data.message || "Added");
        setopen(false);
      } else {
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
      <Dialog open={isopen} onOpenChange={setopen}>
        <DialogTrigger>
          <Button onClick={() => setopen(true)}>Add New Expense</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add your expenses here</DialogTitle>
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
                  <Button type="submit">Add</Button>
                )}
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Createexpense;

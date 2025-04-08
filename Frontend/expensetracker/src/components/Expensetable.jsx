import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";

import { Checkbox } from "./ui/checkbox";


import { Button } from "./ui/button";
import { Edit2, Trash, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { setexpenses } from "./app/expenseslice";

export function Expensetable() {
  const dispatch=useDispatch()
  const { expenses } = useSelector((store) => store.expenseslice);
  
  console.log(expenses);
  const handleremovedexpense=async(expenseeid)=>{
      const res=await axios.post(`http://localhost:9000/api/user/delete/${expenseeid}`,{},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      
        )
    console.log(res.data.message);
    
      if(res.data.success){
        toast.success(res.data.message)
        const filteredexpenses=expenses.filter(expense=>expense._id !== expenseeid)
        dispatch(setexpenses(filteredexpenses))
      }

  }
  if (!Array.isArray(expenses)) {
    console.log("❌ expenses is not an array:", expenses);
  }
  const totalamount=expenses.reduce((acc,current)=> acc + Number(current.amount),0)
  const handlecheckedchange = (expenseid) => {};
  return (
    <Table>
      <TableCaption>A list of your recent expenses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mark as Done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-left">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expenses) => (
          <TableRow key={expenses._id}>
            <Checkbox
              checked={expenses.done}
              onCheckedChange={handlecheckedchange()}
            />
            <TableCell className="font-medium">{expenses.description}</TableCell>
            
            <TableCell>{expenses.amount}</TableCell>
            <TableCell>{expenses.category}</TableCell>
            <TableCell>{expenses.createdAt?.split("T")[0]}</TableCell>
            <TableCell className="text-left">
                <div className="flex items-center justify-end gap-2">
                   <Button onClick={()=>handleremovedexpense(expenses._id)} className=" rounded-full bg-gray-500 hover:border-transparent"  >
                    <Trash2/>
                   </Button>
                   <Button className=" rounded-full bg-gray-500 hover:border-transparent"  >
                    <Edit2/>
                   </Button>
                </div>
            </TableCell>
                
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-left">{totalamount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
export default Expensetable;












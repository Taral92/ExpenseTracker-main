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
import { useSelector } from "react-redux";
import store from "./app/store";
import { Checkbox } from "./ui/checkbox";
import { current } from "@reduxjs/toolkit";

export function Expensetable() {
  const { expenses } = useSelector((store) => store.expenseslice);
  const totalamount=expenses.reduce((acc,current)=> acc + Number(current.amount),0)
  const handlecheckedchange = (expenseid) => {};
  return (
    <Table>
      <TableCaption>A list of your recent expenses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mark as Done</TableHead>
          <TableHead>Descripttion</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expenses) => (
          <TableRow key={expenses._id}>
            <Checkbox
              checked={expenses.done}
              onCheckedChange={handlecheckedchange(expenses._id)}
            />
            <TableCell className="font-medium">{expenses.description}</TableCell>
            
            <TableCell>{expenses.amount}</TableCell>
            <TableCell>{expenses.category}</TableCell>
            <TableCell>{expenses.createdAt?.split("T")[0]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{totalamount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
export default Expensetable;

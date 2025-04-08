import { setexpenses } from "@/components/app/expenseslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Usegetexpenses = () => {
  const { category, MarkasDone } = useSelector((store) => store.expenseslice);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchexpense = async () => {
      try {
        console.log(category, MarkasDone);

        const res = await axios.get(
          `http://localhost:9000/api/user/getallx?category=${category}&done=${MarkasDone}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setexpenses(res.data.expenses));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchexpense();
  }, [dispatch, category, MarkasDone]);
  return null;
};
export default Usegetexpenses;

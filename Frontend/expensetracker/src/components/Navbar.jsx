import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Logo from "./shared/Logo";
import axios from "axios";
import { toast } from "sonner";
const Navbar = () => {
  const navigate = useNavigate();
  const logouthandler = async () => {
    try {
      const res = await axios.post("http://localhost:9000/api/user/logout");
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message || 'user logged out');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const user = true;
  return (
    <div className="border-gray-300 border-b">
      <div className="flex items-center mx-auto h-20 justify-between max-w-7xl">
        <Logo />
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shcdn" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <Button variant="link" onClick={logouthandler}>
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex gap-2">
            <Link to={"/login"}>
              {" "}
              <Button>login</Button>
            </Link>
            <Link to={"/signup"}>
              <Button>signup</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

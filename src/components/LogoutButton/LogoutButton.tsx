import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { SlLogout } from "react-icons/sl";
import { customIcon } from "../../assets/icons/customIcon";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");

    navigate("/");

    toast.success("You have successfully logged out.");
  };

  return (
    <div
      className="flex  gap-4 text-xl mx-auto container ms-4 mt-auto"
      onClick={handleLogout}
    >
      <span>
       {customIcon.logoutBtn}
      </span>
      <span className="text-dark text-[#223A84]"> Logout</span>
    </div>
  );
};

export default LogoutButton;

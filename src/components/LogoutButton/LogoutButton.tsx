import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { SlLogout } from "react-icons/sl";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="31"
          viewBox="0 0 30 31"
          fill="none"
        >
          <path
            d="M19.0497 28.3376H18.8872C13.3372 28.3376 10.6622 26.1501 10.1997 21.2501C10.1497 20.7376 10.5247 20.2751 11.0497 20.2251C11.5497 20.1751 12.0247 20.5626 12.0747 21.0751C12.4372 25.0001 14.2872 26.4626 18.8997 26.4626H19.0622C24.1497 26.4626 25.9497 24.6626 25.9497 19.5751V11.4251C25.9497 6.3376 24.1497 4.5376 19.0622 4.5376H18.8997C14.2622 4.5376 12.4122 6.0251 12.0747 10.0251C12.0122 10.5376 11.5747 10.9251 11.0497 10.8751C10.5247 10.8376 10.1497 10.3751 10.1872 9.8626C10.6122 4.8876 13.2997 2.6626 18.8872 2.6626H19.0497C25.1872 2.6626 27.8122 5.2876 27.8122 11.4251V19.5751C27.8122 25.7126 25.1872 28.3376 19.0497 28.3376Z"
            fill="#292D32"
          />
          <path
            d="M18.7504 16.4375H4.52539C4.01289 16.4375 3.58789 16.0125 3.58789 15.5C3.58789 14.9875 4.01289 14.5625 4.52539 14.5625H18.7504C19.2629 14.5625 19.6879 14.9875 19.6879 15.5C19.6879 16.0125 19.2629 16.4375 18.7504 16.4375Z"
            fill="#292D32"
          />
          <path
            d="M7.3123 20.625C7.0748 20.625 6.83731 20.5375 6.64981 20.35L2.4623 16.1625C2.0998 15.8 2.0998 15.2 2.4623 14.8375L6.64981 10.65C7.0123 10.2875 7.6123 10.2875 7.9748 10.65C8.3373 11.0125 8.3373 11.6125 7.9748 11.975L4.4498 15.5L7.9748 19.025C8.3373 19.3875 8.3373 19.9875 7.9748 20.35C7.7998 20.5375 7.5498 20.625 7.3123 20.625Z"
            fill="#292D32"
          />
        </svg>
      </span>
      <span className="text-dark"> Logout</span>
    </div>
  );
};

export default LogoutButton;

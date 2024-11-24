import React from "react";
import { Outlet } from "react-router-dom";
import {AnimatePresence} from "framer-motion"
const AuthLayout = () => {
  return (
    <AnimatePresence mode="wait">
      <Outlet />
    </AnimatePresence>
  );
};

export default AuthLayout;

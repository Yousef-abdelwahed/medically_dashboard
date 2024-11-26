import React from "react";
import FormData from "./components/FormData";
import { loginImg } from "../../../assets";

const Login = () => {
  return (
    <section
      id="login_section"
      className="login_section_container w-screen min-h-screen flex items-center justify-center  "
    >
      <div className="login_form_box w-[76.875rem] h-screen my-auto flex items-center justify-center flex-col bg-white container">
        {" "}
        <div className="login_header text-center mb-[13px]">
          <h1 className="login_header_text text-[2.5rem] capitalize">hello</h1>
          <p className="text-[1.125rem] text-center mx-auto">
            login to get started
          </p>
        </div>
        {/* form */}
        <div className="login_form_body flex gap-8 max-md:flex-col max-lg:justify-center lg:justify-between w-full ">
          <div className="w-full md:w-1/2 max-w-[24.375rem] flex items-center justify-center max-lg:mx-auto max-md:order-2">
            <FormData />
          </div>
          <figure className=" w-[60%] md:w-1/2 max-lg:mx-auto  max-md:order-0">
            <img src={loginImg} alt="login image " />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Login;

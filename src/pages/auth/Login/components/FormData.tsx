import React, { useState } from "react";
import Inputs from "../../../../components/FormInput/input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { API_AUTH, API_BASE_URL } from "../../../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

interface IFormInput {
  email: string;
  password: string;
}
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  password: yup
    .string()
    .matches(/^(.{8,})$/, "The password is invalid")
    .required("password is required"),
});

const FormData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      let res = await axios.post(`${API_AUTH}/login`, data);
      const token = res.data.access_token;

      if (res.status === 200) {
        Cookies.set("access_token", token, { expires: 1 });
        navigate("/dashboard/home");
      }
      toast.success("welcome ourwebsite");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <div className=" ">Loading...</div>;
  }
  return (
    <>
      <form
        className="login_form max-w-[24.375rem] w-full  flex flex-col gap-[28px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Inputs
              label={"email"}
              id="email"
              type="text"
              {...field}
              placeholder="email"
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Inputs
              label={"password"}
              id="password"
              type="password"
              placeholder="password"
              {...field}
              error={errors.password?.message}
            />
          )}
        />
        <button
          type="submit"
          className="capitalize bg-primary  w-full py-[15px]  text-white rounded-[10px]"
        >
          login
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormData;

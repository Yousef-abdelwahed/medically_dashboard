import React from "react";
import { string } from "yup";

interface IProps {
  label: string;
  id: string;
  error: string | any;
  value: string;
  type: string;
  name: string;
  placeholder: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

// Use React.forwardRef to forward the ref to the input element
const Inputs = React.forwardRef<HTMLInputElement, IProps>(
  ({ label, id, error, ...props }, ref) => {
    return (
      <div className="">
        <label htmlFor={id} className="block  font-[400] mb-2 text-[18px]">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          {...props}
          className={`form_input p-1 w-full ${
            error ? "border-[#EF2B00]" : "focus:border-[#EF7D00]"
          }`}
          autoComplete="on"
        />
        <div className="text-red-500 text-sm md:text-base w-full">
          {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
);

Inputs.displayName = "Inputs";

export default Inputs;

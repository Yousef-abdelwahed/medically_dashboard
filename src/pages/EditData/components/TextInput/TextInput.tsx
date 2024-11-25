import React from "react";

const TextInput = ({
  name,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}) => {
  return (
    <input
      className="input_style p-4 rounded-sm mt-4"
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
export default TextInput;

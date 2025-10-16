import React, { useState } from "react";
import type { FieldError } from "react-hook-form";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  required,
  error,
  type,
  ...props
}) => {
  const [hidden, setHidden] = useState(type === "password");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.name} className="text-sm font-medium">
        <p className={`${error ? "text-red-500" : ""}`}>
          {required && <span className="text-red-500">*</span>} {label}
        </p>
      </label>

      <div className="relative">
        <input
          {...props}
          type={hidden ? "password" : "text"}
          className={`border rounded p-2 pr-10 text-sm w-full focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-green-500"
          } ${props.className || ""}`}
        />
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setHidden((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        )}
      </div>
      <p className="h-1.5 text-xs text-red-500 transition-all duration-200">
        {error?.message?.toString() || ""}
      </p>
    </div>
  );
};

export default FormInput;

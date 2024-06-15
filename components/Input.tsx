import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, id, ...props }, ref) => {
    if (type === "file") {
      return (
        <div className="flex flex-col items-start">
          <label
            htmlFor={id}
            className={twMerge(
              "flex w-full cursor-pointer rounded-md bg-neutral-700 text-white text-sm font-medium px-3 py-3 hover:bg-blue-500 focus:outline-none transition",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            Choose File
          </label>
          <input
            id={id}
            type="file"
            className="hidden"
            disabled={disabled}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        id={id}
        type={type}
        className={twMerge(
          "flex w-full rounded-md bg-neutral-700 border border-transparent text-sm file:border-0 px-3 py-3 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

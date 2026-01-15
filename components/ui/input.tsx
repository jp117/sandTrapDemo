import React from "react";
import { clsx } from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "tap-target block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";


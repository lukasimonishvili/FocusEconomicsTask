"use client";

import ButtonProps from "../types/ButtonsProps";

const Button = ({ label, className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`w-full rounded-lg py-2 text-white transition bg-[#0F437F] hover:bg-[#0D396C] ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;

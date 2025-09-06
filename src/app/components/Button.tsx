"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function Button({
  label,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full rounded-lg py-2 text-white transition ${className}`}
    >
      {label}
    </button>
  );
}

"use client";

import { signOut } from "next-auth/react";
import Button from "./Button";

export default function LogoutButton() {
  return (
    <Button
      label="Logout"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-red-500 hover:bg-red-600"
    />
  );
}

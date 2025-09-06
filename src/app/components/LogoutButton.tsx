"use client";

import { signOut } from "next-auth/react";
import Button from "./Button";

const LogoutButton = () => {
  return (
    <Button label="Logout" onClick={() => signOut({ callbackUrl: "/login" })} />
  );
};

export default LogoutButton;

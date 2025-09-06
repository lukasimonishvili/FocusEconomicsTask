import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import LogoutButton from "./components/LogoutButton";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <h1>Welcome, {session.user?.name}!</h1>
      <LogoutButton />
    </>
  );
}

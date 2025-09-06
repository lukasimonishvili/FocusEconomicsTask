import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { prisma } from "./lib/prisma";
import MetricsList from "./components/MetricList";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const page = Number(searchParams?.page) || 1;
  const limit = 15;
  const skip = (page - 1) * limit;

  const [metrics, totalCount] = await Promise.all([
    prisma.metric.findMany({
      skip,
      take: limit,
    }),
    prisma.metric.count(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      <Header />
      <SideBar />
      <MetricsList metrics={metrics} page={page} totalPages={totalPages} />
    </>
  );
}

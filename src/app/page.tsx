import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { prisma } from "./lib/prisma";
import MetricsList from "./components/MetricList";
import ISearchParams from "./types/ISearchParams";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: ISearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const page = Number(searchParams?.page) || 1;
  const limit = 15;
  const skip = (page - 1) * limit;

  const search = searchParams?.search || "";
  const sortFecha = searchParams?.sortFecha || "";
  const sortValor = searchParams?.sortValor || "";
  const minValor = searchParams?.minValor
    ? Number(searchParams.minValor)
    : null;
  const maxValor = searchParams?.maxValor
    ? Number(searchParams.maxValor)
    : null;

  const where: any = {};

  if (search && search.trim().length > 0) {
    where.OR = [
      { nombreDato: { contains: search } },
      { categoria: { contains: search } },
    ];
  }

  if (minValor !== null) {
    where.valor = { ...(where.valor || {}), gte: minValor };
  }
  if (maxValor !== null) {
    where.valor = { ...(where.valor || {}), lte: maxValor };
  }

  let orderBy: any = undefined;
  if (sortFecha === "asc" || sortFecha === "desc") {
    orderBy = { fecha: sortFecha };
  } else if (sortValor === "asc" || sortValor === "desc") {
    orderBy = { valor: sortValor };
  }

  const [metrics, totalCount] = await Promise.all([
    prisma.metric.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.metric.count({ where }),
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

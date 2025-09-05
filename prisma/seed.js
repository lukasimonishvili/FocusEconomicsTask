import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
console.log("🚀 Running seed script...");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.metric.count();
  if (count > 0) {
    console.log("DB already has data — skipping seed.");
    return;
  }

  const file = path.resolve(process.cwd(), "data", "metrics.json");
  if (!fs.existsSync(file)) {
    throw new Error("data/metrics.json not found");
  }

  const raw = fs.readFileSync(file, "utf-8");
  const parsed = JSON.parse(raw);
  const items = Array.isArray(parsed) ? parsed : [parsed];

  const data = items.map((it) => ({
    nombreDato: it.nombreDato,
    categoria: it.categoria,
    valor: Number(it.valor),
    unidad: it.unidad,
    fecha: new Date(it.fecha),
  }));

  await prisma.metric.createMany({ data });
  console.log(`Inserted ${data.length} rows into Metric.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

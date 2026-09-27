import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { ailments, therapies } from "../src/lib/care-data";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/agentclinic.db",
});
const prisma = new PrismaClient({ adapter });

async function seed() {
  for (const ailment of ailments) {
    await prisma.careItem.upsert({
      where: { slug: ailment.slug },
      create: { slug: ailment.slug, name: ailment.name, kind: "AILMENT" },
      update: { name: ailment.name, kind: "AILMENT" },
    });
  }
  for (const therapy of therapies) {
    await prisma.careItem.upsert({
      where: { slug: therapy.slug },
      create: { slug: therapy.slug, name: therapy.name, kind: "THERAPY" },
      update: { name: therapy.name, kind: "THERAPY" },
    });
  }
}

seed()
  .catch((error: unknown) => {
    console.error("Unable to seed AgentClinic:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

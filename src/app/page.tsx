import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function Home() {
  const projects = await prisma.project.findMany();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Hello 123
      </main>     
    </div>
  );
}

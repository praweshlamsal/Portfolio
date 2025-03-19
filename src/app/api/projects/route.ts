import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const projects = await prisma.project.findMany();
  return Response.json(projects);
}

export async function POST(req: Request) {
  const data = await req.json();
  const project = await prisma.project.create({ data });
  return Response.json(project);
}

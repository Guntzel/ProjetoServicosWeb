import { PrismaClient, Ticket } from "@prisma/client";

const prisma = new PrismaClient();

export class TicketsRepository {
  async create(data: Omit<Ticket, "id">): Promise<Ticket> {
    return prisma.ticket.create({ data });
  }

  async findAll(): Promise<Ticket[]> {
    return prisma.ticket.findMany();
  }

  async findById(id: string): Promise<Ticket | null> {
  return prisma.ticket.findUnique({ where: { id } });
}

  async findByUser(userId: string): Promise<Ticket[]> {
    return prisma.ticket.findMany({ where: { userId } });
  }

async update(id: string, data: { title?: string; description?: string; email?: string }) {
  return prisma.ticket.update({
    where: { id },
    data,
  });
}

  async delete(id: string): Promise<void> {
  await prisma.ticket.delete({ where: { id } });
}
}
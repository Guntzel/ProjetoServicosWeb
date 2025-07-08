import { TicketsRepository } from "../repositories/tickets-repository";
import { Ticket } from "@prisma/client";

export class TicketsService {
  constructor(private repository = new TicketsRepository()) {}

  async create(data: Omit<Ticket, "id">) {
    return this.repository.create(data);
  }

  async list(user: { id: string; role: string }) {
    if (user.role === "admin") {
      return this.repository.findAll();
    }
    return this.repository.findByUser(user.id);
  }
async getById(id: string) {
  return this.repository.findById(id);
}

async update(id: string, data: { title?: string; description?: string; email?: string }) {
  return this.repository.update(id, data);
}


  async delete(id: string) {
  return this.repository.delete(id);
}
}
import { Request, Response, NextFunction } from "express";
import { TicketsService } from "../services/tickets-service";
import { NotFoundError } from "../errors/not-found-error";
const service = new TicketsService();

export class TicketsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, email } = req.body;
      const ticket = await service.create({
        title,
        description,
        email,
        userId: req.user!.id,
      });
      res.status(201).json(ticket);
    } catch (err) {
      next(err);
    }
  }

    async list(req: Request, res: Response, next: NextFunction) {
      try {
        const tickets = await service.list(req.user!);
        if (!tickets || tickets.length === 0) {
          return res.status(200).json({ message: "Nenhum chamado encontrado" });
        }
        res.json(tickets);
      } catch (err) {
        next(err);
      }
  } 

async update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const ticket = await service.getById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Chamado não encontrado" });
    }
    // Só o dono pode editar
    if (ticket.userId !== req.user!.id) {
      return res.status(403).json({ message: "Você só pode editar seus próprios chamados." });
    }
    const { title, description, email } = req.body;
    const updated = await service.update(id, { title, description, email });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

  async delete(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const ticket = await service.getById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Chamado não encontrado" });
    }
    await service.delete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
}
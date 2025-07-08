import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth";
import { TicketsController } from "../controllers/tickets-controller";

const router = Router();
const controller = new TicketsController();

router.post("/", authenticate, controller.create.bind(controller));
router.get("/", authenticate, controller.list.bind(controller));
router.delete("/:id", authenticate, authorizeAdmin, controller.delete.bind(controller));
router.put("/:id", authenticate, controller.update.bind(controller));


export default router;
import { Router } from 'express';
import { CreateTicketController } from '../controllers/CreateTicketController';
import { ListTicketsController } from '../controllers/ListTicketsController';
const ticketsRouter = Router();

ticketsRouter.post('/', CreateTicketController.handle);
ticketsRouter.get('/', ListTicketsController.handle);

export { ticketsRouter };
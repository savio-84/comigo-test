import { Router } from 'express';
import { CreateClientController } from '../controllers/CreateClientController';
import { ListClientsController } from '../controllers/ListClientsController';
import { GetClientController } from '../controllers/GetClientController';
const clientsRouter = Router();

clientsRouter.post('/', CreateClientController.handle);
clientsRouter.get('/', ListClientsController.handle);
clientsRouter.get('/:id', GetClientController.handle);

export { clientsRouter };
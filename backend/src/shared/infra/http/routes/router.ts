import { Router } from 'express';
import { ticketsRouter } from '../../../../modules/tickets/routes';
import { clientsRouter } from '../../../../modules/clients/routes';
import { vehiclesRouter } from '../../../../modules/vehicles/routes';
const router = Router();

router.use('/tickets', ticketsRouter);
router.use('/clients', clientsRouter);
router.use('/vehicles', vehiclesRouter);

export { router };
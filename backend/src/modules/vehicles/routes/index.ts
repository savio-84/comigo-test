import { Router } from 'express';
import { CreateVehicleController } from '../controllers/CreateVehicleController';
import { ListVehiclesController } from '../controllers/ListVehiclesController';
const vehiclesRouter = Router();

vehiclesRouter.post('/:id', CreateVehicleController.handle);
vehiclesRouter.get('/', ListVehiclesController.handle);

export { vehiclesRouter };
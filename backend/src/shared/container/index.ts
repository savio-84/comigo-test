import { DateFnsDateProvider } from './providers/DateProvider/DateFnsDateProvider';
import { IDateProvider } from './providers/DateProvider/IDateProvider';

import { ITicketsRepository } from '../../modules/tickets/database/ITicketsRepository';
import { TicketsRepository } from '../../modules/tickets/database/TicketsRepository';

import { IClientsRepository } from '../../modules/clients/database/IClientsRepository';
import { ClientsRepository } from '../../modules/clients/database/ClientsRepository';

import { IVehiclesRepository } from '../../modules/vehicles/database/IVehiclesRepository';
import { VehiclesRepository } from '../../modules/vehicles/database/VehiclesRepository';

export const dateFnsDateProvider: IDateProvider= new DateFnsDateProvider();
export const ticketsRepository: ITicketsRepository = new TicketsRepository();
export const clientsRepository: IClientsRepository = new ClientsRepository();
export const vehiclesRepository: IVehiclesRepository = new VehiclesRepository();
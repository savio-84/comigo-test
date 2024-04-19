import { AppError } from "../../../../shared/Errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IVehiclesRepository } from "../../../vehicles/database/IVehiclesRepository";
import { ICreateTicketDTO } from "../../DTOs/ICreateTicketDTO";
import { ITicketsRepository } from "../../database/ITicketsRepository";


export class CreateTicketService {
  constructor(
    private ticketRepository: ITicketsRepository,
    private dateProvider: IDateProvider,
    private vehiclesRepository: IVehiclesRepository
  ) {}

  public async execute(data: ICreateTicketDTO) {
    const vehicles = await this.vehiclesRepository.getMany(data.vehicles);
    const clients = vehicles.map(vehicle => vehicle.clientId);
    if (!clients.every(client => client == clients[0])) throw new AppError('Ticket must be from one client');
    return this.ticketRepository.create({
      ...data,
      deadline: this.dateProvider.sumWorkingDays(new Date, 3),
    });
  }
}
import { ICreateTicketDTO } from "../DTOs/ICreateTicketDTO";
import { Ticket } from "../entities/Ticket";
import { ITicketsRepository } from "./ITicketsRepository";
import { dateFnsDateProvider } from '../../../shared/container/index'
import { IVehiclesRepository } from "../../vehicles/database/IVehiclesRepository";
import { Vehicle } from "../../vehicles/entities/Vehicle";

export class TicketsRepositoryInMemory implements ITicketsRepository {
  repository: Ticket[] = [];
  idCounter: number = 0;
  constructor(
    private vehiclesRepository: IVehiclesRepository
  ) {}
  
  async create(data: ICreateTicketDTO): Promise<Ticket> {
    const vehiclesList: Vehicle[] = [];
    data.vehicles.forEach(async id => {
      const vehicle = await this.vehiclesRepository.get(id);
      if (vehicle) vehiclesList.push(vehicle);
    });

    const ticket = new Ticket();
    ticket.id = this.idCounter;
    ticket.type = data.type;
    ticket.reason = data.reason;
    ticket.description = data.description;
    ticket.deadline = dateFnsDateProvider.sumWorkingDays(new Date(), 3);
    ticket.status = 'created';
    ticket.passiveContact = data.passiveContact;
    ticket.contactType = data.contactType;
    ticket.intention = data.intention;
    ticket.createdAt = new Date();
    ticket.vehicles = vehiclesList;
    this.idCounter++;
    this.repository.push(ticket);
    return ticket;
  }

  async list(): Promise<Ticket[]> {
    return this.repository;
  }

}
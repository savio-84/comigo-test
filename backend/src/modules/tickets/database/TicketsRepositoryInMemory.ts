import { ICreateTicketDTO } from "../DTOs/ICreateTicketDTO";
import { Ticket } from "../entities/Ticket";
import { IListResponse, ITicketsRepository } from "./ITicketsRepository";
import { dateFnsDateProvider } from '../../../shared/container/index'
import { IVehiclesRepository } from "../../vehicles/database/IVehiclesRepository";
import { Vehicle } from "../../vehicles/entities/Vehicle";
import { IClientsRepository } from "../../clients/database/IClientsRepository";

export class TicketsRepositoryInMemory implements ITicketsRepository {
  repository: Ticket[] = [];
  idCounter: number = 0;
  constructor(
    private vehiclesRepository: IVehiclesRepository,
    private clientsRepository: IClientsRepository,
  ) {}
  
  async create(data: ICreateTicketDTO): Promise<Ticket> {
    const vehiclesList: Vehicle[] = [];
    
    data.vehicles.forEach(async id => {
      const vehicle = await this.vehiclesRepository.get(id);
      if (vehicle) {
        const client = await this.clientsRepository.get(vehicle.clientId);
        if (client) vehicle.client = client;
        vehiclesList.push(vehicle);
      }
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

  async list(page: number): Promise<IListResponse> {
    const tickets = this.repository;
    let numberOfPages = Math.ceil(this.repository.length / 3);
    
    const response: IListResponse = {
      tickets,
      numberOfPages,
      page
    }

    return response;
  }

}
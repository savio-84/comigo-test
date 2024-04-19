import { In, Repository } from "typeorm";
import { ICreateTicketDTO } from "../DTOs/ICreateTicketDTO";
import { Ticket } from "../entities/Ticket";
import { ICreateTicket, ITicketsRepository } from "./ITicketsRepository";
import { AppDataSource } from "../../../shared/infra/typeorm/data-source";
import { dateFnsDateProvider } from '../../../shared/container';
import { Vehicle } from "../../vehicles/entities/Vehicle";

export class TicketsRepository implements ITicketsRepository {
  private repository: Repository<Ticket>;
  private vehiclesRepository: Repository<Vehicle>;

  constructor() {
    this.repository = AppDataSource.getRepository(Ticket);
    this.vehiclesRepository = AppDataSource.getRepository(Vehicle);
  }

  async create(data: ICreateTicket): Promise<Ticket> {
    const vehicles = await this.vehiclesRepository.find({where: {id: In(data.vehicles)}});
    const ticket = this.repository.create({
      ...data,
      vehicles
    });

    return ticket;
  }

  async list(): Promise<Ticket[]> {
    return this.repository.find();
  }
}
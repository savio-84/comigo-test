import { In, Repository } from "typeorm";
import { ICreateTicketDTO } from "../DTOs/ICreateTicketDTO";
import { Ticket } from "../entities/Ticket";
import { ICreateTicket, IListResponse, ITicketsRepository } from "./ITicketsRepository";
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
      status: 'Criado',
      vehicles
    });

    const { id } = await this.repository.save(ticket);

    const savedTicket = await this.repository.findOne({
      where: {id},
      relations: ['vehicles', 'vehicles.client'],
    })

    return savedTicket!;
  }

  async list(page: number): Promise<IListResponse> {
    
    const tickets = await this.repository.find({
      relations: ['vehicles', 'vehicles.client'],
      skip: ((page - 1) * 3),
      take: 3,
    });

    let numberOfPages = Math.ceil(await this.repository.count() / 3);
    
    const response: IListResponse = {
      tickets,
      numberOfPages,
      page
    }

    return response;
  }
}
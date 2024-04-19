import { ITicketsRepository } from "../../database/ITicketsRepository";
import { Ticket } from "../../entities/Ticket";

export class ListTicketsService {
  constructor(
    private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute(): Promise<Ticket[]> {
    return this.ticketsRepository.list();
  }
}
import { IListResponse, ITicketsRepository } from "../../database/ITicketsRepository";
import { Ticket } from "../../entities/Ticket";

export class ListTicketsService {
  constructor(
    private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute(page: number): Promise<IListResponse> {
    return this.ticketsRepository.list(page);
  }
}
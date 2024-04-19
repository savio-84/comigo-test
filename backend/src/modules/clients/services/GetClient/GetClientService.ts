import { IClientsRepository } from "../../database/IClientsRepository";
import { Client } from "../../entities/Client";

export class GetClientService {
  constructor(
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(id: number): Promise<Client | undefined> {
    return await this.clientsRepository.get(id);
  }
}
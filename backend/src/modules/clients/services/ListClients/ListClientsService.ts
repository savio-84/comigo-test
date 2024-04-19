import { IClientsRepository } from "../../database/IClientsRepository";

export class ListClientsService {
  constructor(
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute() {
    return await this.clientsRepository.list();
  }
}
import { IClientsRepository } from "../../database/IClientsRepository";

export class CreateClientService {
  constructor(
    private clientsRepository: IClientsRepository
  ) {}
  public async execute(name: string, cpf: string) {
    return this.clientsRepository.create(name, cpf);
  }
}
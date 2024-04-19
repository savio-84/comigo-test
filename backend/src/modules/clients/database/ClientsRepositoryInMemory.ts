import { clientsRepository } from "../../../shared/container";
import { Client } from "../entities/Client";
import { IClientsRepository } from "./IClientsRepository";


export class ClientsRepositoryInMemory implements IClientsRepository {
  repository: Client[] = [];
  idCounter: number = 0;
  async create(name: string, cpf: string): Promise<Client> {
    const client = new Client();
    client.name = name;
    client.cpf = cpf;
    client.id = this.idCounter;
    client.createdAt = new Date();

    this.idCounter++;
    this.repository.push(client);
    return client;
  }

  async list(): Promise<Client[]> {
    return this.repository;
  }

  async get(id: number): Promise<Client | undefined> {
    return this.repository.find((client) => client.id == id);
  }
  
}
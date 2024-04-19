import { Repository } from "typeorm";
import { Client } from "../entities/Client";
import { IClientsRepository } from "./IClientsRepository";
import { AppDataSource } from "../../../shared/infra/typeorm/data-source";

export class ClientsRepository implements IClientsRepository {
  repository: Repository<Client>;

  constructor() {
    this.repository = AppDataSource.getRepository(Client);
  }

  async create(name: string, cpf: string): Promise<Client> {
    const client = this.repository.create({ name, cpf });

    await this.repository.save(client);

    return client;
  }

  async list(): Promise<Client[]> {
    return await this.repository.find();
  }

  async get(id: number): Promise<Client | undefined> {
    return await this.repository.findOneBy({ id }) || undefined;
  }
}
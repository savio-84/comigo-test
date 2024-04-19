import { Client } from "../entities/Client";

export interface IClientsRepository {
  create(name: string, cpf: string): Promise<Client>;
  list(): Promise<Client[]>;
  get(id: number): Promise<Client | undefined>;
}
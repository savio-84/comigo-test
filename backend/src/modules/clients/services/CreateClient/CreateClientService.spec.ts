import { ClientsRepositoryInMemory } from "../../database/ClientsRepositoryInMemory";
import { IClientsRepository } from "../../database/IClientsRepository";
import { CreateClientService } from "./CreateClientService";

describe('Create client service', () => {
  let clientsRepository: IClientsRepository;
  let createClientService: CreateClientService;

  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory();
    createClientService = new CreateClientService(clientsRepository);
  });

  it('should be able to create a client', async () => {
    const client = await createClientService.execute('Client name', '12345678910');
    expect(client.name).toBe('Client name');
    expect(client.cpf).toBe('12345678910');
    expect(client.id).toBeDefined();
    expect(client.createdAt).toBeDefined();
  })
}); 
import { ClientsRepositoryInMemory } from "../../database/ClientsRepositoryInMemory";
import { IClientsRepository } from "../../database/IClientsRepository"
import { ListClientsService } from "./ListClientsService";
import { formatCPF } from "../../../../shared/utils/FormatCPF";

describe('List clients service', () => {
  let clientsRepository: IClientsRepository;
  let listClientsService: ListClientsService;

  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory();
    listClientsService = new ListClientsService(clientsRepository);
  });

  it('should be able to list all clients', async () => {
    const client1 = await clientsRepository.create('Client 1', formatCPF('12345678910'));
    const client2 = await clientsRepository.create('Client 2', formatCPF('98765432101'));
    const client3 = await clientsRepository.create('Client 3', formatCPF('11122233344'));

    const clients = await listClientsService.execute();
    expect(clients).toEqual([client1, client2, client3]);    
  })
})
import { formatCPF } from "../../../../shared/utils/FormatCPF";
import { ClientsRepositoryInMemory } from "../../database/ClientsRepositoryInMemory";
import { IClientsRepository } from "../../database/IClientsRepository"
import { CreateClientService } from "../CreateClient/CreateClientService";
import { GetClientService } from "./GetClientService";

describe('Get client service', () => {
  let clientsRepository: IClientsRepository;

  let createClientService: CreateClientService;
  let getClientService: GetClientService;

  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory();
    createClientService = new CreateClientService(clientsRepository);
    getClientService = new GetClientService(clientsRepository);
  });

  it('should be able to get a client', async () => {
    const createdClient = await createClientService.execute('Client Name', formatCPF('12345678910'));
    const client = await getClientService.execute(createdClient.id);
    

    expect(client?.id).toEqual(createdClient.id);
  });
})
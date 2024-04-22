import { dateFnsDateProvider } from "../../../../shared/container";
import { formatCPF } from "../../../../shared/utils/FormatCPF";
import { ClientsRepositoryInMemory } from "../../../clients/database/ClientsRepositoryInMemory";
import { IClientsRepository } from "../../../clients/database/IClientsRepository";
import { CreateClientService } from "../../../clients/services/CreateClient/CreateClientService";
import { IVehiclesRepository } from "../../../vehicles/database/IVehiclesRepository";
import { VehiclesRepositoryInMemory } from "../../../vehicles/database/VehiclesRepositoryInMemory";
import { CreateVehicleService } from "../../../vehicles/services/CreateVehicle/CreateVehicleService";
import { ICreateTicketDTO } from "../../DTOs/ICreateTicketDTO";
import { ITicketsRepository } from "../../database/ITicketsRepository";
import { TicketsRepositoryInMemory } from "../../database/TicketsRepositoryInMemory";
import { CreateTicketService } from "../CreateTicket/CreateTicketService";
import { ListTicketsService } from "./ListTicketsService";

describe('List tickets service', () => {
  let ticketsRepository: ITicketsRepository;
  let clientsRepository: IClientsRepository;
  let vehiclesRepository: IVehiclesRepository;

  let createTicketService: CreateTicketService;
  let createClientService: CreateClientService;
  let createVehicleService: CreateVehicleService;
  let listTicketsService: ListTicketsService;

  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory();
    vehiclesRepository = new VehiclesRepositoryInMemory();
    ticketsRepository = new TicketsRepositoryInMemory(vehiclesRepository, clientsRepository);
    
    createTicketService = new CreateTicketService(ticketsRepository, dateFnsDateProvider, vehiclesRepository);
    createClientService = new CreateClientService(clientsRepository);
    createVehicleService = new CreateVehicleService(vehiclesRepository, clientsRepository);
    listTicketsService = new ListTicketsService(ticketsRepository);
  });

  it('Should be able to list tickets', async () => {
    const client = await createClientService.execute('Client 1', formatCPF('12345678910'));
    const vehicle1 = await createVehicleService.execute({
      brand: 'brand',
      model: 'model',
      year: 2000,
      clientId: client.id,
    });
    const vehicle2 = await createVehicleService.execute({
      brand: 'brand 2',
      model: 'model 2',
      year: 2001,
      clientId: client.id,
    });
    
    const data: ICreateTicketDTO = {
      type: 'tipo',
      passiveContact: false,
      reason: 'motivo',
      description: 'descrição',
      intention: 'intenção',
      vehicles: [vehicle1.id, vehicle2.id],
    };
    const data2: ICreateTicketDTO = {
      type: 'tipo2',
      passiveContact: false,
      reason: 'motivo2',
      description: 'descrição2',
      intention: 'intenção2',
      vehicles: [vehicle1.id, vehicle2.id],
    };

    const page = 1;

    const ticket = await createTicketService.execute(data);
    const ticket2 = await createTicketService.execute(data2);
    const response = await listTicketsService.execute(page);

    expect(response.tickets.length).toBe(2);
    expect(response.tickets).toEqual([ticket, ticket2]);
    expect(response.tickets[0].vehicles.length).toBe(2);
    expect(response.tickets[0].vehicles[0].clientId).toBe(client.id);
    expect(response.tickets[0].vehicles[0].client.name).toBe(`Client 1`);
    expect(response.numberOfPages).toBe(1);
  })
})
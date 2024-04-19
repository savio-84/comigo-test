import { ICreateTicketDTO } from "../../DTOs/ICreateTicketDTO";
import { ITicketsRepository } from "../../database/ITicketsRepository";
import { TicketsRepositoryInMemory } from "../../database/TicketsRepositoryInMemory";
import { CreateTicketService } from "./CreateTicketService";
import { dateFnsDateProvider } from '../../../../shared/container';
import { IClientsRepository } from "../../../clients/database/IClientsRepository";
import { IVehiclesRepository } from "../../../vehicles/database/IVehiclesRepository";
import { CreateClientService } from "../../../clients/services/CreateClient/CreateClientService";
import { CreateVehicleService } from "../../../vehicles/services/CreateVehicle/CreateVehicleService";
import { ClientsRepositoryInMemory } from "../../../clients/database/ClientsRepositoryInMemory";
import { VehiclesRepositoryInMemory } from "../../../vehicles/database/VehiclesRepositoryInMemory";
import { formatCPF } from "../../../../shared/utils/FormatCPF";

describe('Create ticket service', () => {
  let ticketsRepository: ITicketsRepository;
  let clientsRepository: IClientsRepository;
  let vehiclesRepository: IVehiclesRepository;

  let createTicketService: CreateTicketService;
  let createClientService: CreateClientService;
  let createVehicleService: CreateVehicleService;

  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory();
    vehiclesRepository = new VehiclesRepositoryInMemory();
    ticketsRepository = new TicketsRepositoryInMemory(vehiclesRepository);
    
    createTicketService = new CreateTicketService(ticketsRepository, dateFnsDateProvider, vehiclesRepository);
    createClientService = new CreateClientService(clientsRepository);
    createVehicleService = new CreateVehicleService(vehiclesRepository, clientsRepository);
  });

  it('should create a ticket', async () => {
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
    
    const deadline = dateFnsDateProvider.sumWorkingDays(new Date(), 3);
    const data: ICreateTicketDTO = {
      type: 'tipo',
      passiveContact: false,
      reason: 'motivo',
      description: 'descrição',
      intention: 'intenção',
      vehicles: [vehicle1.id, vehicle2.id],
    };

    const ticket = await createTicketService.execute(data);
    expect(ticket).toHaveProperty('id');
    expect(ticket.type).toBe(data.type);
    expect(ticket.deadline.getDay()).toBe(deadline.getDay());
    expect(ticket.vehicles).toEqual([vehicle1, vehicle2]);
  });
  
  it('should not be able to create a ticket from more than one client', async () => {
    try {
      const client = await createClientService.execute('Client 1', formatCPF('12345678910'));
      const client2 = await createClientService.execute('Client 1', formatCPF('11122233344'));
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
        clientId: client2.id,
      });
      
      const deadline = dateFnsDateProvider.sumWorkingDays(new Date(), 3);
      const data: ICreateTicketDTO = {
        type: 'tipo',
        passiveContact: false,
        reason: 'motivo',
        description: 'descrição',
        intention: 'intenção',
        vehicles: [vehicle1.id, vehicle2.id],
      };
  
      await createTicketService.execute(data);
    } catch (error: any) {
      expect(error.message).toBe('Ticket must be from one client');
    }
  });
});
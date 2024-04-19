import { formatCPF } from "../../../../shared/utils/FormatCPF";
import { ClientsRepositoryInMemory } from "../../../clients/database/ClientsRepositoryInMemory";
import { IClientsRepository } from "../../../clients/database/IClientsRepository";
import { CreateClientService } from "../../../clients/services/CreateClient/CreateClientService";
import { IVehiclesRepository } from "../../database/IVehiclesRepository"
import { VehiclesRepositoryInMemory } from "../../database/VehiclesRepositoryInMemory";
import { CreateVehicleService } from "../CreateVehicle/CreateVehicleService";
import { ListVehiclesService } from "./ListVehiclesService";

describe('List vehicle service', () => {
  let vehiclesRepository: IVehiclesRepository;
  let clientsRepository: IClientsRepository;
  let listVehiclesService: ListVehiclesService;
  let createClientService: CreateClientService;
  let createVehicleService: CreateVehicleService;

  beforeEach(() => {
    vehiclesRepository = new VehiclesRepositoryInMemory();
    clientsRepository = new ClientsRepositoryInMemory();
    listVehiclesService = new ListVehiclesService(vehiclesRepository);
    createClientService = new CreateClientService(clientsRepository);
    createVehicleService = new CreateVehicleService(vehiclesRepository, clientsRepository);
  });

  it('should be able to list vehicles', async () => {
    const client = await createClientService.execute('Client 1', formatCPF('12345678910'));
    const vehicle = await createVehicleService.execute({
      clientId: client.id,
      brand: 'brand',
      model: 'model',
      year: 2024
    });
    const vehicle2 = await createVehicleService.execute({
      clientId: client.id,
      brand: 'brand2',
      model: 'model2',
      year: 2023
    });
    const vehicle3 = await createVehicleService.execute({
      clientId: client.id,
      brand: 'brand3',
      model: 'model3',
      year: 2022
    });

    const vehicles = await listVehiclesService.execute();

    expect(vehicles).toEqual([vehicle, vehicle2, vehicle3]);
  });
})
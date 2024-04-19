import { format } from "date-fns";
import { ClientsRepositoryInMemory } from "../../../clients/database/ClientsRepositoryInMemory";
import { IClientsRepository } from "../../../clients/database/IClientsRepository";
import { CreateClientService } from "../../../clients/services/CreateClient/CreateClientService";
import { IVehiclesRepository } from "../../database/IVehiclesRepository"
import { VehiclesRepositoryInMemory } from "../../database/VehiclesRepositoryInMemory";
import { CreateVehicleService } from "./CreateVehicleService"
import { formatCPF } from "../../../../shared/utils/FormatCPF";
import { AppError } from "../../../../shared/Errors/AppError";

describe('Create vehicle service', () => {
  let vehicleRepository: IVehiclesRepository;
  let clientsRepository: IClientsRepository;
  let createVehicleService: CreateVehicleService;
  let createClientService: CreateClientService;


  beforeEach(() => {
    vehicleRepository = new VehiclesRepositoryInMemory();
    clientsRepository = new ClientsRepositoryInMemory();
    createVehicleService = new CreateVehicleService(vehicleRepository, clientsRepository);
    createClientService = new CreateClientService(clientsRepository);
  });

  it('should be able to create a new vehicle', async () => {
    const client = await createClientService.execute('Client 1', formatCPF('12345678910'));
    const vehicle = await createVehicleService.execute({
      clientId: client.id,
      brand: 'brand',
      model: 'model',
      year: 2024
    });

    expect(vehicle).toHaveProperty('id');
    expect(vehicle.brand).toBe('brand');
    expect(vehicle.clientId).toBe(client.id);
  });

  it('should not be able to create a new vehicle from a not valid client', async () => {
    try {
      const vehicle = await createVehicleService.execute({
        clientId: 1, // invalid id
        brand: 'brand',
        model: 'model',
        year: 2024
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Client not found!');
    }
  });
})
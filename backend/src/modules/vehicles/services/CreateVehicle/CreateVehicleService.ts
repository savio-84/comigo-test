import { AppError } from "../../../../shared/Errors/AppError";
import { IClientsRepository } from "../../../clients/database/IClientsRepository";
import { ICreateVehicleDTO } from "../../DTOs/ICreateVehicleDTO";
import { IVehiclesRepository } from "../../database/IVehiclesRepository";
import { Vehicle } from "../../entities/Vehicle";

export class CreateVehicleService {
  constructor(
    private vehicleRepository: IVehiclesRepository,
    private clientsRepository: IClientsRepository,
  ) {}
  public async execute(data: ICreateVehicleDTO): Promise<Vehicle> {
    const client = await this.clientsRepository.get(data.clientId);
    if (!client) throw new AppError('Client not found!', 404);
    return this.vehicleRepository.create(data);
  }
}
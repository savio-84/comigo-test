import { ICreateVehicleDTO } from "../DTOs/ICreateVehicleDTO";
import { Vehicle } from "../entities/Vehicle";

export interface IVehiclesRepository {
  list(): Promise<Vehicle[]>;
  create(data: ICreateVehicleDTO): Promise<Vehicle>;
  get(id: number): Promise<Vehicle | undefined>;
  getMany(ids: number[]): Promise<Vehicle[]>;
}
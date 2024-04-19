import { ICreateVehicleDTO } from "../DTOs/ICreateVehicleDTO";
import { Vehicle } from "../entities/Vehicle";
import { IVehiclesRepository } from "./IVehiclesRepository";


export class VehiclesRepositoryInMemory implements IVehiclesRepository {
  private repository: Vehicle[] = [];
  idCounter: number = 0;

  async list(): Promise<Vehicle[]> {    
    return this.repository;
  }

  async create(data: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = new Vehicle();
    vehicle.id = this.idCounter;
    vehicle.brand = data.brand;
    vehicle.model = data.model;
    vehicle.year = data.year;
    vehicle.clientId = data.clientId;
    vehicle.createdAt = new Date();
    this.idCounter++;
    this.repository.push(vehicle);
    return vehicle;
  }

  async get(id: number): Promise<Vehicle | undefined> {
    return this.repository.find(vehicle => vehicle.id === id) || undefined;
  }

  async getMany(ids: number[]): Promise<Vehicle[]> {
    return this.repository.filter(vehicle => this.repository.includes(vehicle))    
  }

}
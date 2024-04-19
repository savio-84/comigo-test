import { In, Repository } from "typeorm";
import { ICreateVehicleDTO } from "../DTOs/ICreateVehicleDTO";
import { Vehicle } from "../entities/Vehicle";
import { IVehiclesRepository } from "./IVehiclesRepository";
import { AppDataSource } from "../../../shared/infra/typeorm/data-source";

export class VehiclesRepository implements IVehiclesRepository {
  private repository: Repository<Vehicle>;
  constructor() {
    this.repository = AppDataSource.getRepository(Vehicle);
  }

  async list(): Promise<Vehicle[]> {
    return await this.repository.find();
  }
  async create(data: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = this.repository.create(data);
    return this.repository.save(vehicle);
  }

  async get(id: number): Promise<Vehicle | undefined> {
    return await this.repository.findOneBy({ id }) || undefined;
  }

  async getMany(ids: number[]): Promise<Vehicle[]> {
    return await this.repository.findBy({ id: In(ids) });
  }
}
import { IVehiclesRepository } from "../../database/IVehiclesRepository";

export class ListVehiclesService {
  constructor(
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute() {
    return this.vehiclesRepository.list();
  }
}
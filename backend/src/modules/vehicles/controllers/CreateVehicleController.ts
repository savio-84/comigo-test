import { Request, Response } from "express";
import { clientsRepository, vehiclesRepository } from "../../../shared/container";
import { CreateVehicleService } from "../services/CreateVehicle/CreateVehicleService";

export class CreateVehicleController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const {brand, model, year} = request.body;
    const { id } = request.params; 
    const createVehicleService = new CreateVehicleService(vehiclesRepository, clientsRepository);
    const vehicle = await createVehicleService.execute({
      clientId: Number(id),
      brand,
      model,
      year
    });
    return response.status(200).json(vehicle);
  }
}
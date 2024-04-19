import { Request, Response } from "express";
import { vehiclesRepository } from "../../../shared/container";
import { ListVehiclesService } from "../services/ListVehicles/ListVehiclesService";

export class ListVehiclesController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const listVehiclesService = new ListVehiclesService(vehiclesRepository);
    const vehicles = await listVehiclesService.execute();
    return response.status(200).json(vehicles);
  }
}
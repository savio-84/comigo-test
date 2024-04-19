import { Request, Response } from "express";
import { clientsRepository } from "../../../shared/container";
import { ListClientsService } from "../services/ListClients/ListClientsService";

export class ListClientsController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const listClientsService = new ListClientsService(clientsRepository);
    const clients = await listClientsService.execute();
    return response.status(200).json(clients);
  }
}
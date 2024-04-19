import { Request, Response } from "express";
import { GetClientService } from "../services/GetClient/GetClientService";
import { clientsRepository } from "../../../shared/container";

export class GetClientController {
  public static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getClientService = new GetClientService(clientsRepository);
    const client = await getClientService.execute(Number(id));
    return res.status(200).json(client);
  }
}
import { Request, Response } from "express";
import { CreateClientService } from "../services/CreateClient/CreateClientService";
import { clientsRepository } from "../../../shared/container";
import { formatCPF } from '../../../shared/utils/FormatCPF'

export class CreateClientController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf } = request.body;
    const createClientService = new CreateClientService(clientsRepository);
    const client = await createClientService.execute(name, formatCPF(cpf));
    return response.status(200).json(client);
  }
}
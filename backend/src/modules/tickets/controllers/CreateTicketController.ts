import { Request, Response } from "express";
import { CreateTicketService } from "../services/CreateTicket/CreateTicketService";
import { dateFnsDateProvider, ticketsRepository, vehiclesRepository } from "../../../shared/container";


export class CreateTicketController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const {
      description,
      intention,
      passiveContact,
      reason,
      type,
      contactType,
      vehicles
    } = request.body;
    const createTicketService = new CreateTicketService(ticketsRepository, dateFnsDateProvider, vehiclesRepository);
    const ticket = await createTicketService.execute({
      description,
      intention,
      passiveContact,
      reason,
      type,
      contactType,
      vehicles
    });

    return response.status(200).json(ticket);
  }
}
import { Request, Response } from "express";
import { ticketsRepository } from "../../../shared/container";
import { ListTicketsService } from "../services/ListTickets/ListTicketsService";

export class ListTicketsController {
  public static async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const listTicketsService = new ListTicketsService(ticketsRepository);
    const tickets = await listTicketsService.execute(Number(page));
    return response.status(200).json(tickets);
  }
}
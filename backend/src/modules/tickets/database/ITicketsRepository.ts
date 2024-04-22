import { ICreateTicketDTO } from '../DTOs/ICreateTicketDTO';
import { Ticket } from '../entities/Ticket';

export interface ICreateTicket {
  type: string;
  reason: string;
  description: string;
  passiveContact: boolean;
  contactType?: string;
  intention: string;
  vehicles: number[];
  deadline: Date;
}

export interface IListResponse {
  tickets: Ticket[];
  numberOfPages: number;
  page: number;
}

export interface ITicketsRepository {
  create(data: ICreateTicket): Promise<Ticket>;
  list(page: number): Promise<IListResponse>;
}
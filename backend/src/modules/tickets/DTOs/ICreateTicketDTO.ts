export interface ICreateTicketDTO {
  type: string;
  reason: string;
  description: string;
  passiveContact: boolean;
  contactType?: string;
  intention: string;
  vehicles: number[];
}
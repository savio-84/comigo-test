import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from './Ticket';
import { Vehicle } from '../../vehicles/entities/Vehicle';
import { Client } from '../../clients/entities/Client';

@Entity('tickets_vehicles')
export class TicketVehicle {
  @PrimaryGeneratedColumn('increment', {name: 'id'})
  id: number;

  @Column({name: 'client_id'})
  clientId: number;

  @Column({name: 'vehicle_id'})
  vehicleId: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
}
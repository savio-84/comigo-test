import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/Vehicle';
import { TicketVehicle } from './TicketVehicle';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('increment', {name: 'id'})
  id: number;

  @Column({name: 'type'})
  type: string;

  @Column({name: 'reason'})
  reason: string;

  @Column({name: 'description'})
  description: string;

  @Column({name: 'deadline'})
  deadline: Date;

  @Column({name: 'status'})
  status: string;

  @Column({name: 'passive_contact'})
  passiveContact: boolean;

  @Column({name: 'contact_type'})
  contactType?: string;

  @Column({name: 'intention'})
  intention: string;

  @ManyToMany(() => Vehicle)
  @JoinTable({
    name: 'tickets_vehicles',
    joinColumns: [{name: 'ticket_id', referencedColumnName: 'id'}],
    inverseJoinColumns: [{name: 'vehicle_id', referencedColumnName: 'id'}]
  })
  vehicles: Vehicle[];
  

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
}
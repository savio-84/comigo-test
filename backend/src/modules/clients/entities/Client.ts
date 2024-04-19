import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../../tickets/entities/Ticket';
import { TicketVehicle } from '../../tickets/entities/TicketVehicle';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  public name: string;

  @Column({ type: 'varchar', length: 255, name: 'cpf' })
  public cpf: string;

  @CreateDateColumn({name: 'createdAt'})
  public createdAt: Date;
}
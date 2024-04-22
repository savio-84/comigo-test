import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../../clients/entities/Client';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({name: 'client_id'})
  public clientId: number;

  @ManyToOne(() => Client)
  @JoinColumn({name: 'client_id'})
  public client: Client;

  @Column({name: 'model'})
  public model: string;

  @Column({name: 'brand'})
  public brand: string;

  @Column({name: 'year'})
  public year: number;

  @CreateDateColumn({name: 'created_at'})
  public createdAt: Date;
}
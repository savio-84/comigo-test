import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({name: 'client_id'})
  public clientId: number;

  @Column({name: 'model'})
  public model: string;

  @Column({name: 'brand'})
  public brand: string;

  @Column({name: 'year'})
  public year: number;

  @CreateDateColumn({name: 'created_at'})
  public createdAt: Date;
}
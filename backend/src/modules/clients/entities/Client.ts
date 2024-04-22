import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/Vehicle';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  public name: string;

  @Column({ type: 'varchar', length: 255, name: 'cpf' })
  public cpf: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.client)
  public vehicles: Vehicle[];

  @CreateDateColumn({name: 'createdAt'})
  public createdAt: Date;
}
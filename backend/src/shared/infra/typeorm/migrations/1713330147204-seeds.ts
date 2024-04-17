import { MigrationInterface, QueryRunner, Repository } from "typeorm";
import { AppDataSource } from '../data-source';
import { Client } from '../../../../modules/clients/entities/Client';
import { Vehicle } from '../../../../modules/vehicles/entities/Vehicle';
export class Seeds1713330147204 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        const clientsRepository: Repository<any> = AppDataSource.getRepository(Client);
        const client1 = clientsRepository.create({
            name: 'Client 1',
            cpf: '123.456.789-10',
        });
        const client2 = clientsRepository.create({
            name: 'Client 2',
            cpf: '987.654.321-10',
        });
        const client3 = clientsRepository.create({
            name: 'Client 3',
            cpf: '111.222.333-44',
        });

        const clients = await clientsRepository.save([client1, client2, client3]);

        const vehiclesRepository: Repository<any> = AppDataSource.getRepository(Vehicle);
        const vehicle1 = vehiclesRepository.create({
            brand: 'Brand 1',
            model: 'Model 1',
            clientId: clients[0].id,
            year: 2000,
        });
        const vehicle2 = vehiclesRepository.create({
            brand: 'Brand 2',
            model: 'Model 2',
            clientId: clients[1].id,
            year: 2001,
        });
        const vehicle3 = vehiclesRepository.create({
            brand: 'Brand 3',
            model: 'Model 3',
            clientId: clients[2].id,
            year: 2002,
        });
        await vehiclesRepository.save([vehicle1, vehicle2, vehicle3]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const clientsRepository: Repository<any> = AppDataSource.getRepository('clients');
        const vehiclesRepository: Repository<any> = AppDataSource.getRepository('vehicles');
        const client1 = await clientsRepository.findOne({where: {name: 'Client 1'}});
        const client2 = await clientsRepository.findOne({where: {name: 'Client 2'}});
        const client3 = await clientsRepository.findOne({where: {name: 'Client 3'}});
        const client1Vehicles = await vehiclesRepository.find({where: {clientId: client1.id}});
        const client2Vehicles = await vehiclesRepository.find({where: {clientId: client2.id}});
        const client3Vehicles = await vehiclesRepository.find({where: {clientId: client3.id}});
        await vehiclesRepository.remove(client1Vehicles);
        await vehiclesRepository.remove(client2Vehicles);
        await vehiclesRepository.remove(client3Vehicles);
        await clientsRepository.remove({id: client1.id});
        await clientsRepository.remove({id: client2.id});
        await clientsRepository.remove({id: client3.id});
        
    }

}

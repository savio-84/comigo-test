import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVehicle1713321940348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'vehicles',
            columns: [
                {name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'client_id', type: 'integer'},
                {name: 'model', type: 'varchar'},
                {name: 'brand', type: 'varchar'},
                {name: 'year', type: 'integer'},
                {name: 'created_at', type: 'timestamp with time zone', default: 'now()'},
            ],
            foreignKeys: [{
                name: 'VehicleClient',
                columnNames: ['client_id'],
                referencedTableName: 'clients',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vehicles');
    }

}

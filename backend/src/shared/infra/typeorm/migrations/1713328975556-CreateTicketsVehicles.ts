import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTicketsVehicles1713328975556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tickets_vehicles',
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'ticket_id', type: 'int'},
                {name: 'vehicle_id', type: 'int'},
                {name: 'created_at', type: 'timestamp with time zone', default: 'now()'},
            ],
            foreignKeys: [
                {
                    name: 'ticket',
                    referencedTableName: 'tickets',
                    columnNames: ['ticket_id'],
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'vehicle',
                    referencedTableName: 'vehicles',
                    columnNames: ['vehicle_id'],
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tickets_vehicles');
    }

}

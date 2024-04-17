import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTicket1713322368070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tickets',
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'type', type: 'varchar'},
                {name: 'reason', type: 'varchar'},
                {name: 'description', type: 'varchar'},
                {name: 'deadline', type: 'date'},
                {name: 'status', type: 'varchar'},
                {name: 'passiveContact', type: 'boolean'},
                {name: 'contactType', type: 'varchar', isNullable: true},
                {name: 'intention', type: 'varchar'},
                {name: 'created_at', type: 'timestamp with time zone', default: 'now()'},
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tickets');
    }

}

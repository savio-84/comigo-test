import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClient1713291888564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'clients',
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'name', type: 'varchar'},
                {name: 'cpf', type: 'varchar'},
                {name: 'createdAt', type: 'timestamp with time zone', default: 'now()'},
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients');
    }

}

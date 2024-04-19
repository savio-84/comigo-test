import { DataSource, DataSourceOptions, EntitySchema, MixedList } from 'typeorm';
import { env } from '../../../config/env';
import { CreateClient1713291888564 } from './migrations/1713291888564-CreateClient';
import { CreateVehicle1713321940348 } from './migrations/1713321940348-CreateVehicle';
import { CreateTicket1713322368070 } from './migrations/1713322368070-CreateTicket';
import { CreateTicketsVehicles1713328975556 } from './migrations/1713328975556-CreateTicketsVehicles';
import { Seeds1713330147204 } from './migrations/1713330147204-seeds';
import { Ticket } from '../../../modules/tickets/entities/Ticket';

import { Client } from '../../../modules/clients/entities/Client';
import { Vehicle } from '../../../modules/vehicles/entities/Vehicle';

const migrations: MixedList<string | Function> | undefined = [
  CreateClient1713291888564,
  CreateVehicle1713321940348,
  CreateTicket1713322368070,
  CreateTicketsVehicles1713328975556,
  Seeds1713330147204
];

const entities: MixedList<string | Function | EntitySchema<any>> | undefined = [
  Client,
  Vehicle,
  Ticket
]

const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number(env.POSTGRES_PORT),
  username: `${env.POSTGRES_USER}`,
  password: `${env.POSTGRES_PASSWORD}`,
  database: `${env.NODE_ENV === 'test' ? 'test' : process.env.POSTGRES_DB}`,
  migrationsTableName: 'migrations',
  migrations,
  entities,
}

const AppDataSource = new DataSource(options);

export { AppDataSource };


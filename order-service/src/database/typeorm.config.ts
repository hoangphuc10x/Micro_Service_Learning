import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.DB_PORT || process.env.POSTGRES_PORT || 5432),
  username: process.env.DB_USER || process.env.POSTGRES_USER || 'postgres',
  password:
    process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.DB_NAME || process.env.POSTGRES_DB || 'microservices',
  synchronize: false,
  entities: [join(__dirname, '..', '**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
};

export const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

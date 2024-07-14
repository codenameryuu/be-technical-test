import { DataSource } from "typeorm";
import env from "./env";

export const configModule = {
  type: env.database.type,
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.name,
  synchronize: false,
  logging: false,
  autoLoadEntities: true,
  entities: [__dirname + "/../entities/*.entity.ts"],
  migrations: [__dirname + "/../database/migrations/*.ts"],
};

export default new DataSource({
  type: env.database.type,
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.name,
  synchronize: false,
  logging: false,
  entities: [__dirname + "/../entities/*.entity.ts"],
  migrations: [__dirname + "/../database/migrations/*.ts"],
});

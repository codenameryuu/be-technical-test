import env from "./env";

export default {
  type: env.database.type,
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.name,
  synchronize: false,
  logging: false,
  autoLoadEntities: true,
  entities: [__dirname + ""],
  migrations: [__dirname + "/../database/migrations/*.ts"],
  subscribers: [],
};

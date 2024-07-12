import { config as dotenvConfig } from "dotenv";

dotenvConfig({
  path: ".env",
});

export default {
  app: {
    url: process.env.APP_URL || "http://localhost:" + process.env.PORT,
    port: process.env.PORT || 8000,
  },

  database: {
    type: (process.env.DB_CONNECTION as any) || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_DATABASE || "",
  },

  hash: {
    alphabet: process.env.HASH_ALPHABET || "",
    length: parseInt(process.env.HASH_LENGTH) || 10,
  },
};

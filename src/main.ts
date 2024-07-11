import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import multipart from "@fastify/multipart";
import { config as dotenvConfig } from "dotenv";

import { AppModule } from "./app.module";

dotenvConfig({
  path: ".env",
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  await app.register(multipart);

  await app.listen(process.env.PORT || 8000);
}
bootstrap();

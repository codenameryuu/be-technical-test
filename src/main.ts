import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import multipart from "@fastify/multipart";
import { readFile } from "fs/promises";
import { join } from "path";

import { AppModule } from "./app.module";

import env from "./config/env";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  await app.register(multipart);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const options = new DocumentBuilder().setTitle("Title").setDescription("description").setVersion("1.0").build();

  const document = JSON.parse((await readFile(join(process.cwd(), "src/docs/swagger.json"))).toString("utf-8"));

  SwaggerModule.setup("/api-docs", app, document);

  await app.listen(env.app.port);
}
bootstrap();

import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { DataSource } from "typeorm";

import { BookModule } from "./apps/book/book.module";
import { ExampleModule } from "./apps/example/example.module";
import { MemberModule } from "./apps/member/member.module";

import { configModule } from "./config/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),

    TypeOrmModule.forRoot(configModule),

    BookModule,
    ExampleModule,
    MemberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

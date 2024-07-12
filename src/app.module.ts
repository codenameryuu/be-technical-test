import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { DataSource } from "typeorm";

import { ExampleModule } from "./apps/example/example.module";
import { MemberModule } from "./apps/member/member.module";

import typeorm from "./config/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),

    TypeOrmModule.forRoot(typeorm),

    ExampleModule,
    MemberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

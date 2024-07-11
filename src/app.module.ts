import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { DataSource } from "typeorm";

import { MemberModule } from "./apps/member/member.module";

import typeorm from "./config/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [typeorm],
    }),

    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get("typeorm"),
    }),

    MemberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

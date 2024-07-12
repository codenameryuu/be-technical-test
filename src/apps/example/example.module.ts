import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestjsFormDataModule } from "nestjs-form-data";

import { ExampleController } from "./example.controller";
import { ExampleValidation } from "./example.validation";
import { ExampleService } from "./example.service";

import { Member } from "../../entities/member.entity";
import { Book } from "../../entities/book.entity";
import { Loan } from "../../entities/loan.entity";

import { FormatResponse } from "../../trait/format_response.trait";

@Module({
  imports: [NestjsFormDataModule, TypeOrmModule.forFeature([Book, Loan, Member])],
  controllers: [ExampleController],
  providers: [ExampleValidation, ExampleService, FormatResponse],
})
export class ExampleModule {}

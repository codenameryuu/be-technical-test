import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestjsFormDataModule } from "nestjs-form-data";

import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";
import { BookService } from "./book.service";

import { Book } from "../../entities/book.entity";


import { FormatResponse } from "../../trait/format_response.trait";

@Module({
  imports: [NestjsFormDataModule, TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookValidation, BookService, FormatResponse],
})
export class BookModule {}

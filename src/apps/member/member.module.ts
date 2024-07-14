import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestjsFormDataModule } from "nestjs-form-data";

import { Book } from "../../entities/book.entity";
import { Loan } from "../../entities/loan.entity";
import { Member } from "../../entities/member.entity";
import { MemberPenalty } from "../../entities/member_penalty.entity";

import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";
import { MemberValidation } from "./member.validation";


import { FormatResponse } from "../../trait/format_response.trait";

@Module({
  imports: [NestjsFormDataModule, TypeOrmModule.forFeature([Book, Member, Loan, MemberPenalty])],
  controllers: [MemberController],
  providers: [MemberValidation, MemberService, FormatResponse],
})
export class MemberModule {}

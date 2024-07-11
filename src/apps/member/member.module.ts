import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestjsFormDataModule } from "nestjs-form-data";

import { Member } from "../../entities/member.entity";

import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";
import { MemberValidation } from "./member.validation";

import { FormatResponse } from "../../trait/format_response.trait";

@Module({
  imports: [NestjsFormDataModule, TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberValidation, MemberService, FormatResponse],
})
export class MemberModule {}

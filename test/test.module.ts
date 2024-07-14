import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TestService } from "./test.service";

import { configModule } from "../src/config/typeorm";

import { Book } from "../src/entities/book.entity";
import { Loan } from "../src/entities/loan.entity";
import { Member } from "../src/entities/member.entity";
import { MemberPenalty } from "../src/entities/member_penalty.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Book, Member, Loan, MemberPenalty])],
  providers: [TestService],
  exports: [],
})
export class TestModule {}

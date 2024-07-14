import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";

import { BorrowBookDto } from "./dto/borrow_book.dto";
import { ReturnBookDto } from "./dto/return_book.dto";

import { MemberValidation } from "./member.validation";
import { MemberService } from "./member.service";

import { FormatResponse } from "../../trait/format_response.trait";

@Controller("api/member")
export class MemberController {
  constructor(private memberValidation: MemberValidation, private memberService: MemberService, private formatResponse: FormatResponse) {}

  @Get()
  @HttpCode(200)
  async index(): Promise<any> {
    const validation = await this.memberValidation.index();

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation);
    }

    const result = await this.memberService.index();

    return this.formatResponse.sendResponse(result);
  }

  @Post("borrow-book")
  @HttpCode(200)
  @FormDataRequest()
  async borrowBook(@Body() request: BorrowBookDto): Promise<any> {
    const validation = await this.memberValidation.borrowBook(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation);
    }

    const result = await this.memberService.borrowBook(request);

    return this.formatResponse.sendResponse(result);
  }

  @Post("return-book")
  @HttpCode(200)
  @FormDataRequest()
  async returnBook(@Body() request: ReturnBookDto): Promise<any> {
    const validation = await this.memberValidation.returnBook(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation);
    }

    const result = await this.memberService.returnBook(request);

    return this.formatResponse.sendResponse(result);
  }
}

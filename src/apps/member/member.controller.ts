import { Controller, Get, HttpCode } from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";

import { MemberValidation } from "./member.validation";
import { MemberService } from "./member.service";

import { FormatResponse } from "../../trait/format_response.trait";

@Controller("api")
export class MemberController {
  constructor(private memberValidation: MemberValidation, private memberService: MemberService, private formatResponse: FormatResponse) {}

  @Get("member")
  @HttpCode(200)
  async index(): Promise<any> {
    const validation = await this.memberValidation.index();

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation);
    }

    const result = await this.memberService.index();

    return this.formatResponse.sendResponse(result);
  }
}

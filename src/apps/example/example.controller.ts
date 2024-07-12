import { Controller, HttpCode, Post } from "@nestjs/common";

import { ExampleValidation } from "./example.validation";
import { ExampleService } from "./example.service";

import { FormatResponse } from "../../trait/format_response.trait";

@Controller("api/example")
export class ExampleController {
  constructor(private exampleValidation: ExampleValidation, private exampleService: ExampleService, private formatResponse: FormatResponse) {}

  @Post()
  @HttpCode(200)
  async example(): Promise<any> {
    const validation = await this.exampleValidation.example();

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation);
    }

    const result = await this.exampleService.example();

    return this.formatResponse.sendResponse(result);
  }
}

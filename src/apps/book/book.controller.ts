import { Controller, Get, HttpCode } from "@nestjs/common";

import { BookValidation } from "./book.validation";
import { BookService } from "./book.service";

import { FormatResponse } from "../../trait/format_response.trait";

@Controller("api/book")
export class BookController {
  constructor(private bookValidation: BookValidation, private bookService: BookService, private formatResponse: FormatResponse) {}

  @Get()
  @HttpCode(200)
  async index(): Promise<any> {
    const validation = await this.bookValidation.index();

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation);
    }

    const result = await this.bookService.index();

    return this.formatResponse.sendResponse(result);
  }
}

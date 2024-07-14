import { Injectable } from "@nestjs/common";

import MessageHelper from "../../helpers/message.helper";

@Injectable()
export class BookValidation {
  async index(): Promise<any> {
    let status = true;
    let message = MessageHelper.validateSuccess();

    let result = {
      status: status,
      message: message,
    };

    return result;
  }
}

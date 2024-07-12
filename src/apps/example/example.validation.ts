import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import MessageHelper from "../../helpers/message.helper";

@Injectable()
export class ExampleValidation {
  async example(): Promise<any> {
    let status = true;
    let message = MessageHelper.validateSuccess();

    let result = {
      status: status,
      message: message,
    };

    return result;
  }
}

import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { Member } from "../../entities/member.entity";

import MessageHelper from "../../helpers/message.helper";

@Injectable()
export class MemberService {
  constructor(private dataSource: DataSource) {}

  async index(): Promise<any> {
    let status = true;
    let message = MessageHelper.retrieveSuccess();

    const data = await this.dataSource.getRepository(Member).find({
      relations: ["loans"],
      order: {
        name: "ASC",
      },
    });

    let result = {
      status: status,
      message: message,
      data: data,
    };

    return result;
  }
}

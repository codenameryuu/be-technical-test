import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { Book } from "../../entities/book.entity";

import MessageHelper from "../../helpers/message.helper";

@Injectable()
export class BookService {
  constructor(private dataSource: DataSource) {}

  async index(): Promise<any> {
    let status = true;
    let message = MessageHelper.retrieveSuccess();

    const data = await this.dataSource
      .getRepository(Book)
      .createQueryBuilder("book")
      .leftJoin("book.loans", "loans")
      .where("loans.return_datetime IS NULL")
      .getMany();

    let result = {
      status: status,
      message: message,
      data: data,
    };

    return result;
  }
}

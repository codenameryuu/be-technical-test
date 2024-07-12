import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { Book } from "../../entities/book.entity";
import { Loan } from "../../entities/loan.entity";
import { Member } from "../../entities/member.entity";

import ExampleHelper from "../../helpers/example.helper";
import MessageHelper from "../../helpers/message.helper";

@Injectable()
export class ExampleService {
  constructor(private dataSource: DataSource) {}

  async example(): Promise<any> {
    let status = true;
    let message = MessageHelper.saveSuccess();

    const book = ExampleHelper.book();

    for (const row of book) {
      const data = await this.dataSource.getRepository(Book).findOneBy({
        code: row.code,
      });

      if (!data) {
        await this.dataSource.getRepository(Book).save(row);
      }
    }

    const member = ExampleHelper.member();

    for (const row of member) {
      const data = await this.dataSource.getRepository(Member).findOneBy({
        code: row.code,
      });

      if (!data) {
        await this.dataSource.getRepository(Member).save(row);
      }
    }

    const loan = ExampleHelper.loan();

    for (const row of loan) {
      const data = await this.dataSource.getRepository(Loan).findOneBy({
        book: {
          id: row.book_id,
        },

        member: {
          id: row.member_id,
        },
      });

      if (!data) {
        await this.dataSource.getRepository(Loan).save({
          member: {
            id: row.member_id,
          },

          book: {
            id: row.book_id,
          },

          loan_date: row.loan_date,
        });
      }
    }

    let result = {
      status: status,
      message: message,
    };

    return result;
  }
}

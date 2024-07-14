import { Injectable } from "@nestjs/common";
import { DateTime } from "luxon";
import { DataSource, IsNull } from "typeorm";

import { BorrowBookDto } from "./dto/borrow_book.dto";
import { ReturnBookDto } from "./dto/return_book.dto";

import { Book } from "../../entities/book.entity";
import { Member } from "../../entities/member.entity";
import { Loan } from "../../entities/loan.entity";
import { MemberPenalty } from "../../entities/member_penalty.entity";

import MessageHelper from "../../helpers/message.helper";

@Injectable()
export class MemberService {
  constructor(private dataSource: DataSource) {}

  async index(): Promise<any> {
    let status = true;
    let message = MessageHelper.retrieveSuccess();

    const data = await this.dataSource
      .getRepository(Member)
      .createQueryBuilder("member")
      .leftJoin("member.loans", "loan", "loan.return_date IS NULL")
      .loadRelationCountAndMap("member.loan_book", "member.loans", "loan", (query) => {
        return query.andWhere("loan.return_date IS NULL");
      })
      .orderBy("member.name", "ASC")
      .getMany();

    let result = {
      status: status,
      message: message,
      data: data,
    };

    return result;
  }

  async borrowBook(request: BorrowBookDto): Promise<any> {
    let status = true;
    let message = MessageHelper.saveSuccess();
    let data = null;

    try {
      await this.dataSource.transaction(async (manager) => {
        const book = await manager.getRepository(Book).findOne({
          where: {
            id: request.book_id,
          },

          lock: {
            mode: "pessimistic_write",
          },
        });

        if (!book || book.stock <= 0) {
          status = false;
          message = "Stok buku tidak tersedia !";

          return {
            status: status,
            message: message,
          };
        }

        await manager.getRepository(Book).update(
          {
            id: request.book_id,
          },

          {
            stock: book.stock - 1,
          }
        );

        const loan = await manager.getRepository(Loan).save({
          member: {
            id: request.member_id,
          },

          book: {
            id: request.book_id,
          },

          loan_date: DateTime.now().toFormat("yyyy-LL-dd"),
        });

        data = await manager.getRepository(Loan).findOneBy({
          id: loan.id,
        });
      });
    } catch (error) {
      status = false;
      message = "Gagal meminjam buku !";
    }

    return {
      status: status,
      message: message,
      data: data,
    };
  }

  async returnBook(request: ReturnBookDto): Promise<any> {
    let status = true;
    let message = MessageHelper.saveSuccess();

    const loan = await this.dataSource.getRepository(Loan).findOne({
      where: {
        member: {
          id: request.member_id,
        },

        book: {
          id: request.book_id,
        },

        return_date: IsNull(),
      },

      order: {
        loan_date: "DESC",
      },
    });

    await this.dataSource.getRepository(Loan).update(
      {
        id: loan.id,
      },

      {
        return_date: DateTime.now().toFormat("yyyy-LL-dd"),
      }
    );

    const today = DateTime.now().toFormat("yyyy-LL-dd");
    const deadlineDate = DateTime.fromJSDate(loan.loan_date)
      .plus({
        days: 7,
      })
      .toFormat("yyyy-LL-dd");

    if (today > deadlineDate) {
      const penaltyDate = DateTime.now()
        .plus({
          days: 3,
        })
        .toFormat("yyyy-LL-dd");

      await this.dataSource.getRepository(MemberPenalty).save({
        member: {
          id: request.member_id,
        },

        penalty_date: penaltyDate,
      });
    }

    const data = await this.dataSource.getRepository(Loan).findOneBy({
      id: loan.id,
    });

    return {
      status: status,
      message: message,
      data: data,
    };
  }
}

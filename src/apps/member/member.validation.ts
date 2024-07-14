import { Injectable } from "@nestjs/common";
import { DateTime } from "luxon";
import Joi from "joi";
import { DataSource, IsNull } from "typeorm";

import { BorrowBookDto } from "./dto/borrow_book.dto";
import { ReturnBookDto } from "./dto/return_book.dto";

import { Book } from "../../entities/book.entity";
import { Loan } from "../../entities/loan.entity";
import { Member } from "../../entities/member.entity";
import { MemberPenalty } from "../../entities/member_penalty.entity";

import JoiHelper from "../../helpers/joi_helper";
import MessageHelper from "../../helpers/message.helper";

@Injectable()
export class MemberValidation {
  constructor(private dataSource: DataSource) {}

  async index(): Promise<any> {
    let status = true;
    let message = MessageHelper.validateSuccess();

    let result = {
      status: status,
      message: message,
    };

    return result;
  }

  async borrowBook(request: BorrowBookDto): Promise<any> {
    let status = true;
    let message = MessageHelper.validateSuccess();
    let errorField = null;

    const schema = Joi.object({
      member_id: Joi.string()
        .required()
        .messages({
          "string.base": "ID anggota harus berupa string !",
          "string.empty": "ID anggota tidak boleh kosong !",
          "any.required": "ID anggota tidak boleh kosong !",
        })
        .external(async (value) => {
          const member = await this.dataSource.getRepository(Member).findOneBy({
            id: value,
          });

          if (!member) {
            JoiHelper.errorMessage("member_id", "ID anggota tidak ditemukan !", value);
          }

          return true;
        }),

      book_id: Joi.string()
        .required()
        .messages({
          "string.base": "ID buku harus berupa string !",
          "string.empty": "ID buku tidak boleh kosong !",
          "any.required": "ID buku tidak boleh kosong !",
        })
        .external(async (value) => {
          const book = await this.dataSource.getRepository(Book).findOneBy({
            id: value,
          });

          if (!book) {
            JoiHelper.errorMessage("book_id", "ID buku tidak ditemukan !", value);
          }

          return true;
        }),
    });

    const data = {
      member_id: request.member_id,
      book_id: request.book_id,
    };

    try {
      await schema.validateAsync(data);

      // * Cek apakah anggota sudah meminjam lebih dari 2 buku
      const countLoan = await this.dataSource.getRepository(Loan).countBy({
        member: {
          id: request.member_id,
        },
      });

      if (countLoan > 1) {
        JoiHelper.errorMessage("member_id", "Anggota sudah meminjam 2 buku !", request.member_id);
      }

      // * Cek apakah buku sedang dipinjam oleh anggota lain
      const bookLoan = await this.dataSource.getRepository(Loan).findOne({
        where: {
          book: {
            id: request.book_id,
          },

          return_date: null,
        },
      });

      if (bookLoan) {
        JoiHelper.errorMessage("book_id", "Buku sedang dipinjam oleh anggota lain !", request.book_id);
      }

      // * Cek apakah anggota sedang dalam masa penalti
      const memberPenalty = await this.dataSource.getRepository(MemberPenalty).findOne({
        where: {
          member: {
            id: request.member_id,
          },
        },

        order: {
          penalty_date: "DESC",
        },
      });

      if (memberPenalty) {
        const now = DateTime.now().toFormat("yyyy-LL-dd");
        const deadlineDate = DateTime.fromJSDate(memberPenalty.penalty_date)
          .plus({
            days: 3,
          })
          .toFormat("yyyy-LL-dd");

        if (deadlineDate > now) {
          JoiHelper.errorMessage("member_id", "Anggota sedang dalam masa penalti !", request.member_id);
        }
      }
    } catch (error: any) {
      status = false;
      message = error.details[0].message;
      errorField = error.details[0].path[0];
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  }

  async returnBook(request: ReturnBookDto): Promise<any> {
    let status = true;
    let message = MessageHelper.validateSuccess();
    let errorField = null;

    const schema = Joi.object({
      member_id: Joi.string()
        .required()
        .messages({
          "string.base": "ID anggota harus berupa string !",
          "string.empty": "ID anggota tidak boleh kosong !",
          "any.required": "ID anggota tidak boleh kosong !",
        })
        .external(async (value) => {
          const member = await this.dataSource.getRepository(Member).findOneBy({
            id: value,
          });

          if (!member) {
            JoiHelper.errorMessage("member_id", "ID anggota tidak ditemukan !", value);
          }

          return true;
        }),

      book_id: Joi.string()
        .required()
        .messages({
          "string.base": "ID buku harus berupa string !",
          "string.empty": "ID buku tidak boleh kosong !",
          "any.required": "ID buku tidak boleh kosong !",
        })
        .external(async (value) => {
          const book = await this.dataSource.getRepository(Book).findOneBy({
            id: value,
          });

          if (!book) {
            JoiHelper.errorMessage("book_id", "ID buku tidak ditemukan !", value);
          }

          return true;
        }),
    });

    const data = {
      member_id: request.member_id,
      book_id: request.book_id,
    };

    try {
      await schema.validateAsync(data);

      // * Cek apakah buku yang dikembalikan adalah buku yang telah dipinjam oleh anggota
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

      if (!loan) {
        JoiHelper.errorMessage("book_id", "Buku yang dikembalikan tidak sesuai dengan buku yang dipinjam !", request.book_id);
      }
    } catch (error: any) {
      status = false;
      message = error.details[0].message;
      errorField = error.details[0].path[0];
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  }
}

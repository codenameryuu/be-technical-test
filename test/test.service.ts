import { Injectable } from "@nestjs/common";
import { DateTime } from "luxon";
import { DataSource } from "typeorm";

import { Book } from "../src/entities/book.entity";
import { Loan } from "../src/entities/loan.entity";
import { Member } from "../src/entities/member.entity";

import ExampleHelper from "../src/helpers/example.helper";

@Injectable()
export class TestService {
  constructor(private dataSource: DataSource) {}

  async truncateAll() {
    await this.dataSource.query("SET FOREIGN_KEY_CHECKS = 0");

    await this.dataSource.query("TRUNCATE TABLE `loans`");
    await this.dataSource.query("TRUNCATE TABLE `member_penalties`");
    await this.dataSource.query("TRUNCATE TABLE `books`");
    await this.dataSource.query("TRUNCATE TABLE `members`");

    await this.dataSource.query("SET FOREIGN_KEY_CHECKS = 1");
  }

  async generateExample() {
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
  }

  async generateExampleBorrowTwoBooks() {
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

    await this.dataSource.getRepository(Loan).save({
      member: {
        id: 1,
      },

      book: {
        id: 1,
      },

      loan_date: DateTime.now().toFormat("yyyy-LL-dd"),
    });

    await this.dataSource.getRepository(Loan).save({
      member: {
        id: 1,
      },

      book: {
        id: 2,
      },

      loan_date: DateTime.now().toFormat("yyyy-LL-dd"),
    });
  }

  async generateExampleOtherMemberBorrowedBook() {
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

    await this.dataSource.getRepository(Loan).save({
      member: {
        id: 2,
      },

      book: {
        id: 1,
      },

      loan_date: DateTime.now().toFormat("yyyy-LL-dd"),
    });
  }

  async generateExampleMemberGetPenalty() {
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

    await this.dataSource.getRepository(Loan).save({
      member: {
        id: 1,
      },

      book: {
        id: 1,
      },

      loan_date: DateTime.now()
        .minus({
          days: 10,
        })
        .toFormat("yyyy-LL-dd"),
    });
  }
}

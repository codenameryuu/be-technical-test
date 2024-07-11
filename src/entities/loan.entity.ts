import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterLoad, ManyToOne, JoinColumn } from "typeorm";

import { Book } from "./book.entity";
import { Member } from "./member.entity";

import HashHelper from "../helpers/hash.helper";

@Entity({
  name: "loans",
})
export class Loan {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;
  hash_id: string;

  @ManyToOne(() => Member, (data) => data, { eager: true })
  @JoinColumn({
    name: "member_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_member_id",
  })
  member: Member;

  @ManyToOne(() => Book, (data) => data, { eager: true })
  @JoinColumn({
    name: "book_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_book_id",
  })
  book: Book;

  @Column({
    name: "loan_date",
  })
  loan_date: Date;

  @Column({
    name: "return_date",
    nullable: true,
  })
  return_date?: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    nullable: true,
  })
  deleted_at?: Date;

  @CreateDateColumn({
    name: "created_at",
  })
  created_at: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updated_at: Date;

  @AfterLoad()
  generateHashId(): void {
    this.hash_id = HashHelper.encode(this.id);
  }
}

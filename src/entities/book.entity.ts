import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Loan } from "./loan.entity";

@Entity({
  name: "books",
})
export class Book {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @OneToMany(() => Loan, (loan) => loan.book)
  @JoinColumn({
    name: "book_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_member_id",
  })
  loans: Loan[];

  @Column({
    name: "code",
    unique: true,
  })
  code: string;

  @Column({
    name: "title",
  })
  title: string;

  @Column({
    name: "author",
  })
  author: string;

  @Column({
    name: "stock",
  })
  stock: number;

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
}

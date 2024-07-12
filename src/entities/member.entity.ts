import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterLoad, OneToMany, JoinColumn } from "typeorm";

import { Loan } from "./loan.entity";

import HashHelper from "../helpers/hash.helper";

@Entity({
  name: "members",
})
export class Member {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;
  hash_id: string;

  @OneToMany(() => Loan, (loan) => loan.member)
  @JoinColumn({
    name: "member_id",
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
    name: "name",
  })
  name: string;

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

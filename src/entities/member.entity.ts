import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from "typeorm";

import { Loan } from "./loan.entity";

@Entity({
  name: "members",
})
export class Member {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

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
}

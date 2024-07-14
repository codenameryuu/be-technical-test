import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { Member } from "./member.entity";

@Entity({
  name: "member_penalties",
})
export class MemberPenalty {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @ManyToOne(() => Member, (member) => member, { eager: true })
  @JoinColumn({
    name: "member_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_member_id",
  })
  member: Member;

  @Column({
    name: "penalty_date",
  })
  penalty_date: Date;

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

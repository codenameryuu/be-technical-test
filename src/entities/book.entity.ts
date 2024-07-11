import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterLoad } from "typeorm";

import HashHelper from "../helpers/hash.helper";

@Entity({
  name: "books",
})
export class Book {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;
  hash_id: string;

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

  @AfterLoad()
  generateHashId(): void {
    this.hash_id = HashHelper.encode(this.id);
  }
}

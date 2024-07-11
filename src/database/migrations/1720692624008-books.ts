import { MigrationInterface, QueryRunner, Table, TableColumn, TableIndex } from "typeorm";

export class Books1720692624008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "books",
        columns: [
          new TableColumn({
            name: "id",
            type: "bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),

          new TableColumn({
            name: "code",
            type: "varchar",
            isUnique: true,
          }),

          new TableColumn({
            name: "title",
            type: "varchar",
          }),

          new TableColumn({
            name: "author",
            type: "varchar",
          }),

          new TableColumn({
            name: "stock",
            type: "bigint",
            default: 0,
          }),

          new TableColumn({
            name: "deleted_at",
            type: "timestamp",
            default: null,
            isNullable: true,
          }),

          new TableColumn({
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          }),

          new TableColumn({
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          }),
        ],
      }),
      true
    );

    await queryRunner.createIndex("books", new TableIndex({ name: "IDX_BOOK_CODE", columnNames: ["code"] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("books", "IDX_BOOK_CODE");
    await queryRunner.dropTable("books");
  }
}

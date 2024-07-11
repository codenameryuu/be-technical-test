import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class Loans1720693135484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "loans",
        columns: [
          new TableColumn({
            name: "id",
            type: "bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),

          new TableColumn({
            name: "member_id",
            type: "bigint",
            isNullable: true,
          }),

          new TableColumn({
            name: "book_id",
            type: "bigint",
            isNullable: true,
          }),

          new TableColumn({
            name: "loan_date",
            type: "timestamp",
          }),

          new TableColumn({
            name: "return_date",
            type: "timestamp",
            isNullable: true,
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

    await queryRunner.createForeignKey(
      "loans",
      new TableForeignKey({
        columnNames: ["member_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "members",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "loans",
      new TableForeignKey({
        columnNames: ["book_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "books",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("loans");
    const foreignKeyMember = table.foreignKeys.find((fk) => fk.columnNames.indexOf("member_id") !== -1);
    const foreignKeyBook = table.foreignKeys.find((fk) => fk.columnNames.indexOf("book_id") !== -1);
    await queryRunner.dropForeignKey("loans", foreignKeyMember);
    await queryRunner.dropForeignKey("loans", foreignKeyBook);
    await queryRunner.dropTable("loans");
  }
}

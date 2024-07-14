import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class MemberPenalty1720779956372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "member_penalties",
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
            name: "penalty_date",
            type: "date",
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
      "member_penalties",
      new TableForeignKey({
        columnNames: ["member_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "members",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("member_penalties");
    const foreignKeyMember = table.foreignKeys.find((fk) => fk.columnNames.indexOf("member_id") !== -1);
    await queryRunner.dropForeignKey("member_penalties", foreignKeyMember);
    await queryRunner.dropTable("member_penalties");
  }
}

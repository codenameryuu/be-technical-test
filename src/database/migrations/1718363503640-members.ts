import { MigrationInterface, QueryRunner, Table, TableColumn, TableIndex } from "typeorm";

export class Members1718363503640 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "members",
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
            name: "name",
            type: "varchar",
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

    await queryRunner.createIndex("members", new TableIndex({ name: "IDX_MEMBER_CODE", columnNames: ["code"] }));
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("members", "IDX_MEMBER_CODE");
    await queryRunner.dropTable("members");
  }
}

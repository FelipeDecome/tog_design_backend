import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderToArticles1623940317155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_to_articles',
        columns: [
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'article_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['article_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'articles',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_to_articles');
  }
}

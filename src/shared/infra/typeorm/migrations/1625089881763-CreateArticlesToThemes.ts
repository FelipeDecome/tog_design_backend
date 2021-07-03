import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArticlesToThemes1625089881763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles_to_themes',
        columns: [
          {
            name: 'article_id',
            type: 'uuid',
          },
          {
            name: 'theme_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['article_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'articles',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['theme_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'themes',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles_to_themes');
  }
}

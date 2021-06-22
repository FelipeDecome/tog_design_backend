import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCoupons1624305953758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coupons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'coupon',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'discount',
            type: 'numeric',
            precision: 6,
            scale: 3,
          },
          {
            name: 'expiration_date',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coupons');
  }
}

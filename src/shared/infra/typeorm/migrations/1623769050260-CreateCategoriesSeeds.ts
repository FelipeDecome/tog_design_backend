import { Category } from '@modules/articles/infra/typeorm/entities/Category';
import { In, MigrationInterface, QueryRunner } from 'typeorm';

const seeds = [
  {
    name: 'Strategy',
    description: 'Emerging, identifying',
  },
  {
    name: 'Design',
    description: 'Research, Design and Validation',
  },
  {
    name: 'Development',
    description: 'From ideation to a product',
  },
  {
    name: 'Social',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    name: 'Business',
    description: 'Lorem ipsum dolor sit amet',
  },
];

export class CreateCategoriesSeeds1623769050260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = queryRunner.manager.create(Category, seeds);
    await queryRunner.manager.save(categories);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const seedsNames = seeds.map(seed => seed.name);
    await queryRunner.manager.delete(Category, { name: In(seedsNames) });
  }
}

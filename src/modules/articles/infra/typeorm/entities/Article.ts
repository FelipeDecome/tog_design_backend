import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Category } from './Category';
import { Theme } from './Theme';

@Entity('articles')
class Article {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  author_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: User;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Theme, { cascade: ['insert'] })
  @JoinTable({
    name: 'articles_to_themes',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'theme_id', referencedColumnName: 'id' },
  })
  themes: Theme[];

  @Column()
  cover: string;

  @Column('uuid')
  category_id: string;

  @Column('numeric', { precision: 19, scale: 4 })
  price: number;

  @ManyToMany(() => Order, order => order.articles)
  orders: Order[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Article };

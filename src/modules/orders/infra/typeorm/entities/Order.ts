import { Article } from '@modules/articles/infra/typeorm/entities/Article';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('orders')
class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('numeric', { precision: 19, scale: 2 })
  total: number;

  @Column()
  coupon_id?: string;

  @ManyToMany(() => Article, article => article.orders)
  @JoinTable({
    name: 'order_to_articles',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'article_id', referencedColumnName: 'id' },
  })
  articles: Article[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Order };

import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Category } from './Category';

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

  @Column()
  themes: string;

  @Column()
  cover: string;

  @Column('uuid')
  category_id: string;

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

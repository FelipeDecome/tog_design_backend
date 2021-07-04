import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

interface IUserToClient {
  id: string;
  name: string;
  email: string;
}

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }

  public userToClient(): IUserToClient {
    const { id, name, email } = this;

    return {
      id,
      name,
      email,
    };
  }
}

export { User };

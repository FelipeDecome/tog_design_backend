import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

interface IThemeToClient {
  id: string;
  name: string;
}
@Entity('themes')
class Theme {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }

  public themeToClient(): IThemeToClient {
    const { id, name } = this;

    return {
      id,
      name,
    };
  }
}

export { Theme };

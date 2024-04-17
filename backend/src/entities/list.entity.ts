import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('hlists')
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  initializer: string;

  @Column({ nullable: false })
  game: string;

  @CreateDateColumn()
  date_at: Date;
}

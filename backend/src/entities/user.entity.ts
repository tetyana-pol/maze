import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('husers')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
}

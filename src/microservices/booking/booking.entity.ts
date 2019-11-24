import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  item_id: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: string;
}

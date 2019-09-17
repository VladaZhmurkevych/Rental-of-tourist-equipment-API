import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Category, { nullable: false })
  @JoinColumn()
  category: Category;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'money', nullable: true })
  rentPricePerHour: number;

  @Column({ type: 'money', nullable: true })
  rentPricePerDay: number;

  @Column({ type: 'money' })
  originalPrice: number;

  @Column({ type: 'varchar', nullable: true })
  mainPhoto: string;
}

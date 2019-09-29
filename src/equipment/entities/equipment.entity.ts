import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Category, category => category.equipment, {
    nullable: false,
  })
  @JoinColumn()
  category: Category;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float', nullable: true })
  rentPricePerHour: number;

  @Column({ type: 'float', nullable: true })
  rentPricePerDay: number;

  @Column({ type: 'float' })
  originalPrice: number;

  @Column({ type: 'varchar', nullable: true })
  mainPhoto: string;
}

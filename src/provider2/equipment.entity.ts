import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

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

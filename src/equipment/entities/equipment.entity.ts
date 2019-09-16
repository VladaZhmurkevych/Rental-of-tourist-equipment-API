import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  categoryId: number;

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

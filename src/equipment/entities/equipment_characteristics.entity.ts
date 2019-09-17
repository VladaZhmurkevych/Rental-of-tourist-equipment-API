import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Equipment } from './equipment.entity';

@Entity()
export class EquipmentCharacteristics {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Equipment)
  @JoinColumn()
  equipment: Equipment;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  value: string;
}

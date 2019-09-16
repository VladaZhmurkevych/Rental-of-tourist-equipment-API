import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EquipmentCharacteristics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  equipmentId: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  value: string;
}

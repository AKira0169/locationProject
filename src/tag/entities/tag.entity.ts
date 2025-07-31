import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToMany(() => Location, (location) => location.tags)
  locations: Location[];
}

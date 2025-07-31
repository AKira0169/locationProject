import { Tag } from 'src/tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('double precision')
  latitude: number;
  @Column('double precision')
  longitude: number;

  @ManyToMany(() => Tag, (tag) => tag.locations, { cascade: true })
  @JoinTable()
  tags: Tag[];
}

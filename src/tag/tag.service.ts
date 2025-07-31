import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  findAll() {
    return `This action returns all tag`;
  }

  async findOne(id: number) {
    return await this.tagRepository.findOne({ where: { id } });
  }
  async findByIds(ids: number[]): Promise<Tag[]> {
    return this.tagRepository.findBy({ id: In(ids) });
  }
}

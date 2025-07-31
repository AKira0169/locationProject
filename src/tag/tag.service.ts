import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findByNames(labels: string[]): Promise<Tag[]> {
    return await this.tagRepository.find({
      where: { label: In(labels) },
    });
  }

  async findByIds(ids: number[]): Promise<Tag[]> {
    const tags = await this.tagRepository.findBy({ id: In(ids) });
    if (ids.length !== tags.length) {
      throw new BadRequestException('Invalde tag ids');
    }
    return tags;
  }
}

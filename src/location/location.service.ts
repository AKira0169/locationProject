import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagService } from 'src/tag/tag.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    private tagService: TagService,
    private socketGateway: SocketGateway,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { tags: tagIds, ...locationData } = createLocationDto;

    // Create a new Location instance
    const location = new Location();
    Object.assign(location, locationData);

    // Save the location first
    const savedLocation = await this.locationRepository.save(location);

    // Then handle tags if they exist
    if (tagIds && tagIds.length > 0) {
      const tags = await this.tagService.findByIds(tagIds);
      savedLocation.tags = tags; // This will work now
      await this.locationRepository.save(savedLocation);
    }

    this.socketGateway.server.emit('newLocation', savedLocation);

    return savedLocation;
  }

  findAll() {
    return `This action returns all location`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}

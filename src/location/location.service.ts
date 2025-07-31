import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagService } from 'src/tag/tag.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { Location } from './entities/location.entity';
import { map } from 'rxjs';

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

    // Create location instance using repository.create() for better performance
    const location = this.locationRepository.create(locationData);

    // Fetch tags in parallel if they exist
    if (tagIds?.length > 0) {
      const tags = await this.tagService.findByIds(tagIds);
      location.tags = tags;
    }

    // Single save operation with cascade handling the relationship
    const savedLocation = await this.locationRepository.save(location);

    // Load the complete entity with relations for consistent response
    const fullLocation = await this.locationRepository.findOne({
      where: { id: savedLocation.id },
      relations: ['tags'],
    });

    // Emit the complete entity to socket
    this.socketGateway.server.emit('newLocation', fullLocation);

    return fullLocation;
  }

  async findAll() {
    const locations = await this.locationRepository.find({
      relations: ['tags'],
    });

    return locations.map((location) => ({
      ...location,
      mapUrl: `https://www.google.com/maps?q=${location.latitude},${location.longitude}`,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  async remove(id: number) {
    return await this.locationRepository.delete(id);
  }
}

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
    const { tags: tagLabels, ...locationData } = createLocationDto;

    // Create the location instance
    const location = this.locationRepository.create(locationData);

    if (tagLabels?.length > 0) {
      // Step 1: Get existing tags by label
      const existingTags = await this.tagService.findByNames(tagLabels);
      const existingLabels = existingTags.map((tag) => tag.label);

      // Step 2: Find missing labels
      const newLabels = tagLabels.filter(
        (label) => !existingLabels.includes(label),
      );

      // Step 3: Create missing tags
      const newTags = await Promise.all(
        newLabels.map((label) => this.tagService.create({ label })),
      );

      // Step 4: Combine all tags
      location.tags = [...existingTags, ...newTags];
    }

    // Save the location
    const savedLocation = await this.locationRepository.save(location);

    // Load with relations
    const fullLocation = await this.locationRepository.findOne({
      where: { id: savedLocation.id },
      relations: ['tags'],
    });

    // Emit to socket
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

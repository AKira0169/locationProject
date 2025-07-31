import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return await this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }
}

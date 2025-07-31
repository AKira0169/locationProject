import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from 'src/tag/tag.module';
import { SocketModule } from 'src/socket/socket.module';
import { Location } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), TagModule, SocketModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
@WebSocketGateway()
export class SocketGateway {
  constructor(
    @Inject(forwardRef(() => LocationService))
    private locationService: LocationService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newLocation')
  async emitNewLocation(@MessageBody() createSocketDto: string) {
    const parsedData = JSON.parse(createSocketDto) as CreateLocationDto;
    const myDtoInstance = plainToClass(CreateLocationDto, parsedData);
    const errors = await validate(myDtoInstance);

    if (errors.length > 0) {
      this.server.emit('error', 'Validation failed');
      return null;
    }
    const location = await this.locationService.create(parsedData);
    return location;
  }
}

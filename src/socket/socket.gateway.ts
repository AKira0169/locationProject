import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateSocketDto } from './dto/createSocket.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newLocation ')
  emitNewLocation(
    @MessageBody() createSocketDto: CreateSocketDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('newLocation', createSocketDto);
    return null;
  }
}

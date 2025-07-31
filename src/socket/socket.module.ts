import { forwardRef, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [forwardRef(() => LocationModule)],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}

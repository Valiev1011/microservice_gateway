import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { AUTH_SERVICE_NAME, protobufPackage } from '../../shared/auth';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: protobufPackage,
          protoPath: [resolve(__dirname, '../../../protos/auth.proto')],
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}

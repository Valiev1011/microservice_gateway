import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FILE_SERVICE_NAME, protobufPackage } from '../shared/file';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: protobufPackage,
          protoPath: resolve(__dirname, '../../protos/file.proto'),
        },
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}

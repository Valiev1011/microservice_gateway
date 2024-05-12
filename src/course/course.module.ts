import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { COURSE_SERVICE_NAME, protobufPackage } from 'shared/course';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: COURSE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: protobufPackage,
          protoPath: [resolve(__dirname, '../../../protos/course.proto')],
        },
      },
    ]),
  ],
  controllers: [CourseController],
  providers: [],
})
export class CourseModule {}

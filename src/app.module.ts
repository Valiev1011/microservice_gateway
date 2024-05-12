import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ThrottlerModule.forRoot([
      {
        ttl: seconds(60),
        limit: 10,
      },
    ]),
    AuthModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

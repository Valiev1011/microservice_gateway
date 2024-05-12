import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { CourseModule } from './course/course.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ThrottlerModule.forRoot([
      {
        ttl: seconds(60),
        limit: 10,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'data'),
      exclude: ['index.html'],
    }),
    AuthModule,
    CourseModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

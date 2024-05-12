import {
  Controller,
  Post,
  OnModuleInit,
  Inject,
  HttpException,
  Body,
  Req,
  Res,
  UseGuards,
  Delete,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LogOutMessage,
  Tokens,
  User,
} from '../shared/auth';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/auth.guard';
import { SetUserCourseDto } from './dto/set-course.dto';
import { Course, Courses } from 'src/shared/course';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: CreateAuthDto): Promise<Tokens> {
    try {
      const response = await firstValueFrom(this.authService.signup(signUpDto));
      return response;
    } catch (error) {
      throw new HttpException(error.details, 400);
    }
  }

  @Post('login')
  async login(@Body() loginDto: CreateAuthDto): Promise<Tokens> {
    try {
      const response = await firstValueFrom(this.authService.login(loginDto));
      return response;
    } catch (error) {
      throw new HttpException(error.details, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Get('get-me')
  async getMe(@Req() req: Request): Promise<User> {
    try {
      const response = await firstValueFrom(
        this.authService.getMe({ accessToken: req['token'] }),
      );
      return response;
    } catch (error) {
      throw new HttpException(error.details, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogOutMessage> {
    try {
      const response = await firstValueFrom(
        this.authService.logout({ accessToken: req['token'] }),
      );

      return response;
    } catch (error) {
      throw new HttpException(error.details, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Post('set-course')
  async setCourse(
    @Req() req: Request,
    @Body() payload: SetUserCourseDto,
  ): Promise<Course> {
    try {
      const response = await firstValueFrom(
        this.authService.setUserCourse({
          accessToken: req['token'],
          courseId: payload.courseId,
        }),
      );

      return response;
    } catch (error) {
      throw new HttpException(error.details, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Get('get-courses')
  async getCourses(@Req() req: Request): Promise<Courses> {
    try {
      const response = await firstValueFrom(
        this.authService.getUserCourses({
          accessToken: req['token'],
        }),
      );

      return response;
    } catch (error) {
      throw new HttpException(error.details, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('remove-course/:id')
  async removeUserCourse(
    @Req() req: Request,
    @Param('id', ParseIntPipe) courseId: number,
  ): Promise<Course> {
    try {
      const response = await firstValueFrom(
        this.authService.deleteUserCourse({
          accessToken: req['token'],
          courseId,
        }),
      );

      return response;
    } catch (error) {
      throw new HttpException(error.details, 400);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { COURSE_SERVICE_NAME, CourseServiceClient } from 'shared/course';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'shared/auth.guard';

@ApiTags('Course')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('course')
export class CourseController {
  private courseService: CourseServiceClient;

  constructor(
    @Inject(COURSE_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.courseService =
      this.client.getService<CourseServiceClient>(COURSE_SERVICE_NAME);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return this.courseService.getAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getOne({ id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update({ id, ...updateCourseDto });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.delete({ id });
  }
}

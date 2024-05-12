import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteUserCourseDto {
  @ApiProperty({ type: Number, description: 'Course ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}

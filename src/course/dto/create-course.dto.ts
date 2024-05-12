import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    type: String,
    description: 'Course title',
    example: 'english',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Course description',
    example: 'english course desc',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

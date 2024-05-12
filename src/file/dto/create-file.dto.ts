import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFileDto {
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  filePath: string;
}

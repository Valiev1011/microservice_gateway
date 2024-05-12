import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ type: String, description: 'Login', example: 'username' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ type: String, description: 'Password', example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

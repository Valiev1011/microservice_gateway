import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpStatus,
  HttpCode,
  UploadedFile,
  ParseFilePipe,
  Inject,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadDto } from './dto/uploadFile.dto';
import { ValidFileValidator } from '../shared/fileValidator';
import { FILE_SERVICE_NAME, FileServiceClient } from '../shared/file';
import { ClientGrpc } from '@nestjs/microservices';

@ApiTags('Files')
@Controller('file')
export class FileController {
  private fileGrpcService: FileServiceClient;

  constructor(
    private readonly fileService: FileService,
    @Inject(FILE_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.fileGrpcService =
      this.client.getService<FileServiceClient>(FILE_SERVICE_NAME);
  }

  //-------------- UPLOAD IMAGE --------------------//

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image (png, jpeg)*',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: 'Upload new image' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'succesfully uploaded',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid image',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token is not found',
  })
  @Post('upload-image')
  @HttpCode(HttpStatus.CREATED)
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new ValidFileValidator({})],
      }),
    )
    image: FileUploadDto,
  ) {
    return this.fileService.uploadImage(image);
  }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    console.log(createFileDto);
    return this.fileGrpcService.createFile(createFileDto);
  }
}

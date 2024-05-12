import { BadRequestException, Injectable } from '@nestjs/common';
import { uploadFile } from '../shared/fileUpload';

@Injectable()
export class FileService {
  async uploadImage(image: any) {
    try {
      const filename = await uploadFile(image);
      return { image: filename };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

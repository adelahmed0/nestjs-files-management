import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createParseFilePipe } from 'src/shared/files/files-validation-factory';

type File = Express.Multer.File;

@Controller('files-upload')
export class FilesUploadController {
  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(createParseFilePipe(2 * 1024 * 1024, ['png', 'jpg']))
    file: File,
  ) {
    console.log(file);
  }

  @Post('/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles(createParseFilePipe(2 * 1024 * 1024, ['png', 'jpg']))
    files: File[],
  ) {
    console.log(files);
  }
}

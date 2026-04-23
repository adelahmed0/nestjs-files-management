import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

type File = Express.Multer.File;

@Controller('files-upload')
export class FilesUploadController {
  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024 * 1024, // 2MB
            message: (maxSize) =>
              `File too large. Max size is ${maxSize} bytes`,
          }),
          new FileTypeValidator({
            fileType: 'image/*',
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        exceptionFactory: (error) => {
          console.log(error);
          throw new UnprocessableEntityException(error);
        },
      }),
    )
    file: File,
  ) {
    console.log(file);
  }

  @Post('/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2 * 1024 * 1024, // 2MB
            message: (maxSize) =>
              `File too large. Max size is ${maxSize} bytes`,
          }),
          new FileTypeValidator({
            fileType: '/png|jpg/',
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        exceptionFactory: (error) => {
          console.log(error);
          throw new UnprocessableEntityException(error);
        },
      }),
    )
    files: File[],
  ) {
    console.log(files);
  }
}

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
import { FileSignatureValidator } from 'src/shared/files/validators/file-signature.validator';

type File = Express.Multer.File;

@Controller('files-upload')
export class FilesUploadController {
  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // 1) Validate file size (2MB max)
          new MaxFileSizeValidator({
            maxSize: 2 * 1024 * 1024, // 2MB
            message: (maxSize) =>
              `File too large. Max size is ${maxSize} bytes`,
          }),
          // 2) Validate file type (PNG or JPG)
          new FileTypeValidator({
            fileType: '/png|jpg/',
          }),
          // 3) custom validator (validate file signature)
          new FileSignatureValidator(),
        ],
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

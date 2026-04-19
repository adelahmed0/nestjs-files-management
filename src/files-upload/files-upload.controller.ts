import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

type File = Express.Multer.File;

@Controller('files-upload')
export class FilesUploadController {
  @Post('/single')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 2, // 2MB
      },
    }),
  )
  uploadFile(@UploadedFile() file: File) {
    console.log(file);
  }

  @Post('/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      limits: {
        fileSize: 1024 * 1024 * 2, // 2MB
      },
    }),
  )
  uploadFiles(@UploadedFiles() files: File[]) {
    console.log(files);
  }
}

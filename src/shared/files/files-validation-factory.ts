import {
  FileTypeValidator,
  FileValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileSignatureValidator } from './validators/file-signature.validator';

const createFileValidators = (
  maxSize: number,
  fileType: RegExp | string,
): FileValidator[] => [
  // 1) Validate file size
  new MaxFileSizeValidator({
    maxSize,
    message: (maxSize) => `File too large. Max size is ${maxSize} bytes`,
  }),
  // 2) Validate file type (PNG or JPG)
  new FileTypeValidator({
    fileType,
  }),
  // 3) custom validator (validate file signature)
  new FileSignatureValidator(),
];

export const createParseFilePipe = (
  maxSize: number,
  fileType: RegExp | string,
): ParseFilePipe => {
  return new ParseFilePipe({
    validators: createFileValidators(maxSize, fileType),
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    exceptionFactory: (error) => {
      console.log(error);
      throw new UnprocessableEntityException(error);
    },
  });
};

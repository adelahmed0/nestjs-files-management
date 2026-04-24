import { FileValidator } from '@nestjs/common';
import magicBytes from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }
  buildErrorMessage(): string {
    return 'validation failed (file signature does not match expected types)';
  }
  isValid(file?: any): boolean {
    // TODO: Implement file signature validation logic here
    if (!file) return false;

    const fileWithBuffer = file as { buffer?: Buffer; mimetype?: string };
    if (!fileWithBuffer.buffer) return false;

    const filesSignature = magicBytes(fileWithBuffer.buffer).map(
      (file) => file.mime,
    );

    if (filesSignature.length === 0) return false;

    const isMatched = fileWithBuffer.mimetype
      ? filesSignature.includes(fileWithBuffer.mimetype)
      : false;
    console.log('filesSignature', filesSignature);
    return isMatched;
  }
}

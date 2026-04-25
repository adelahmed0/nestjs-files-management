import { FileType } from '../types/file.types';
import { lookup } from 'mime-types';

export const createFileTypeRegex = (fileTypes: FileType[]): RegExp => {
  // TODO: Use mime-types to get the correct regex
  const mimeTypes = fileTypes
    .map((type) => lookup(type))
    .filter((type) => type !== false);
  return new RegExp(mimeTypes.join('|'), 'i');
};

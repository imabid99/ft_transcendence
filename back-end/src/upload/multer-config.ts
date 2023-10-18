// multer-config.ts
import { extname } from 'path';
import { diskStorage } from 'multer';

export const customStorage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = extname(file.originalname);
    callback(null, uniqueSuffix + fileExtension);
  }
});

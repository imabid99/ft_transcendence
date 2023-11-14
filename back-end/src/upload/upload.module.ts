import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { uploadController } from "./upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import { customStorage } from "./multer-config";
import { ChatService } from "../chat/chat.service";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [
    MulterModule.register({
      storage: customStorage,
    }),
  ],
  controllers: [uploadController],
  providers: [UploadService, ChatService, UserService, PrismaService],
})
export class UploadModule {}
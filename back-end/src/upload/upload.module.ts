import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { uploadController } from "./upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import { customStorage } from "./multer-config";
import { ChatService } from "../chat/chat.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationModule } from "src/notification/notification.module";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";
import { ChatModule } from "src/chat/chat.module";

@Module({
  imports: [
    MulterModule.register({
      storage: customStorage,
    }),
    ChatModule,
  ],
  controllers: [uploadController],
  providers: [UploadService, PrismaService, NotificationGateway],
})
export class UploadModule {}
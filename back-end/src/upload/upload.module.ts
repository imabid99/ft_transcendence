import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { uploadController } from "./upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import { customStorage } from "./multer-config";
import { ChatService } from "../chat/chat.service";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationModule } from "src/notification/notification.module";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";
import { FriendshipService } from "src/friendship/friendship.service";

@Module({
  imports: [
    MulterModule.register({
      storage: customStorage,
    }),
    NotificationModule,
  ],
  controllers: [uploadController],
  providers: [UploadService, ChatService, FriendshipService,UserService, PrismaService, NotificationGateway],
})
export class UploadModule {}
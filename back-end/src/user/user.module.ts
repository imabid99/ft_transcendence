import { Module } from "@nestjs/common";

import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";
import { userController } from "./user.controller";

@Module({
  controllers: [userController],
  providers: [UserService, PrismaService, NotificationGateway],
})
export class UserModule {}
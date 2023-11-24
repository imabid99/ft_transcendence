import { Module } from "@nestjs/common";

import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";
import { authController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [authController],
  providers: [UserService,AuthService, PrismaService, NotificationGateway],
})
export class AuthModule {}
import { Module } from "@nestjs/common";
import { friendshipController } from "./friendship.controller";
import { FriendshipService } from "./friendship.service";
import { NotificationService } from "src/notification/notification.service";
import { UserService } from "src/user/user.service";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";
import { NotificationModule } from "src/notification/notification.module";

@Module({
  imports: [NotificationModule],
  providers: [FriendshipService, NotificationGateway],
  controllers: [friendshipController],
})
export class friendshipModule { }
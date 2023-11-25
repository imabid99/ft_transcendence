import { Module } from "@nestjs/common";
import { friendshipController } from "./friendship.controller";
import { FriendshipService } from "./friendship.service";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";

@Module({
  imports: [],
  providers: [FriendshipService, NotificationGateway],
  controllers: [friendshipController],
})
export class friendshipModule { }
import { Module } from "@nestjs/common";
import { ChatGateway } from "./gateway/chat/chat.gateway";
import { UserService } from "../user/user.service";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { FriendshipService } from "src/friendship/friendship.service";
import { friendshipModule } from "src/friendship/friendship.module";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";

@Module({
  imports: [],
  providers: [ChatGateway,NotificationGateway, UserService, ChatService, FriendshipService],
  controllers: [ChatController],
})
export class ChatModule {}

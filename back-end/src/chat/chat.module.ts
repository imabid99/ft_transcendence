import { Module } from "@nestjs/common";
import { ChatGateway } from "./gateway/chat/chat.gateway";
import { UserService } from "../user/user.service";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";

@Module({
  imports: [],
  providers: [ChatGateway, UserService, ChatService, NotificationGateway],
  controllers: [ChatController],
})
export class ChatModule {}

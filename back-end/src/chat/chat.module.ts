import { Module } from "@nestjs/common";
import { ChatGateway } from "./gateway/chat/chat.gateway";
import { UserService } from "../user.service";

@Module({
  providers: [ChatGateway, UserService],
})
export class ChatModule {}

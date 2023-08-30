import { Module } from "@nestjs/common";
import { ChatGateway } from "./gateway/chat/chat.gateway";
import { UserService } from "../user.service";
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatGateway, UserService, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}

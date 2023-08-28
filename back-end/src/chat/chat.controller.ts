import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Req,
    Patch,
    Param,
    Headers,
    Request,
  } from "@nestjs/common";
  import { ChatService } from "./chat.service";
  import { JwtAuthGuard } from "../jwt-auth/jwt-auth.guard";
  import jwtDecode from "jwt-decode";

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}
    //hadi 5asha tkon fchat
    @Get("channel/:id")
    @UseGuards(JwtAuthGuard)
    async channel(
        @Param("id") id: string,
        @Headers() headers: any
    ): Promise<any> {
        const token = headers.authorization.split(" ")[1];
        const decoded: any = jwtDecode(token);
        return this.chatService.getChannel(decoded?.userId.toString(), id);
    }

      //hadi 5asha tkon fchat
    @Get("messages/:id")
    @UseGuards(JwtAuthGuard)
    messages(@Param() params: any) {
        return this.chatService.getMessages(params.id);
    }

    @Get("myChannels/:id")
    @UseGuards(JwtAuthGuard)
    async myChannels(@Param("id") id: string): Promise<any> {
      return this.chatService.getMyChannels(id);
    }
    
    @Get("channels")
    @UseGuards(JwtAuthGuard)
    async channels(@Headers() headers: any): Promise<any> {
      const token = headers.authorization.split(" ")[1];
      const decoded: any = jwtDecode(token);
      return this.chatService.getChannels(decoded.userId);
    }
}

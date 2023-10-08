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
  import { AuthGuard } from "@nestjs/passport";
  import jwtDecode from "jwt-decode";

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}
    //hadi 5asha tkon fchat
    @Get("channel/:id")
    @UseGuards(AuthGuard("jwt"))
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
      @UseGuards(AuthGuard("jwt"))
    messages(@Param() params: any) {
        return this.chatService.getMessages(params.id);
    }

    @Get("myChannels/:id")
    @UseGuards(AuthGuard("jwt"))
    async myChannels(@Param("id") id: string): Promise<any> {
      return this.chatService.getMyChannels(id);
    }
    
    @Get("channels")
    @UseGuards(AuthGuard("jwt"))
    async channels(@Headers() headers: any): Promise<any> {
      const token = headers.authorization.split(" ")[1];
      const decoded: any = jwtDecode(token);
      return this.chatService.getChannels(decoded.userId);
    }

    @Get("is-mute/:userId/:grouptId")
    @UseGuards(AuthGuard("jwt"))
    async isMute(
      @Param("userId") userId: string,
      @Param("grouptId") groupId: string
    ): Promise<{ iMute: boolean; heMute: boolean }> {
      return this.chatService.checkMute(userId, groupId);
    }
}

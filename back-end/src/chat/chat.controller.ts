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
    @Get("channel/:id")
    @UseGuards(AuthGuard("jwt"))
    async channel(
        @Param("id") id: string,
        @Req() req
    ): Promise<any> {
        return this.chatService.getChannel(req.user.id, id);
    }

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
    async channels(@Req() req): Promise<any> {
      return this.chatService.getChannels(req.user.id);
    }

    @Get("is-mute/:userId/:grouptId")
    @UseGuards(AuthGuard("jwt"))
    async isMute(
      @Param("userId") userId: string,
      @Param("grouptId") groupId: string
    ): Promise<{ iMute: boolean; heMute: boolean }> {
      return this.chatService.checkMute(userId, groupId);
    }

    @Get('myBlocked')
    @UseGuards(AuthGuard('jwt'))
    async myBlocked(@Req() req): Promise<any> {
      return this.chatService.getMyBlocked(req.user.id);
    }
}

import {
    Controller,
    Get,
    UseGuards,
    Req,
    Patch,
    Param,
    Headers,
    Request,
    Delete,
    Post,
    UploadedFile,
    UseInterceptors,
  } from "@nestjs/common";
  import { FriendshipService } from "./friendship.service";
  import { AuthGuard } from "@nestjs/passport";
  
  @Controller("friendship")
  export class friendshipController {
    constructor(private friendshipService: FriendshipService) {}

    @Post("request/:id")
    @UseGuards(AuthGuard("jwt"))
    async makeRequest(@Req() req, @Param() params: any): Promise<void> {
      return this.friendshipService.makeRequest(req.user.id, params.id);
    }
    @Patch("accept/:id")
    @UseGuards(AuthGuard("jwt"))
    async acceptRequest(@Req() req, @Param() params: any): Promise<void> {
      return this.friendshipService.acceptRequest(req.user.id, params.id);
    }
  }
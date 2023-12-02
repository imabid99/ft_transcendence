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
  import { GameService } from "./game.service";
  import { AuthGuard } from "@nestjs/passport";
  
  @Controller("game")
  export class GameController {
    constructor(private gameService: GameService) {}
  
    @Post("request/:id")
    @UseGuards(AuthGuard("jwt"))
    async makeRequest(@Req() req, @Param() params: any): Promise<void> {
      return this.gameService.makeRequest(req.user.id, params.id);
    }

    @Patch("accept/:id")
    @UseGuards(AuthGuard("jwt"))
    async acceptRequest(@Req() req, @Param() params: any): Promise<void> {
      return this.gameService.acceptRequest(params.id, req.user.id, req.body.notId);
    }

    @Patch("refuse/:id")
    @UseGuards(AuthGuard("jwt"))
    async refuseRequest(@Req() req, @Param() params: any): Promise<void> {
      return this.gameService.refuseRequest(params.id, req.user.id, req.body.notId);
    }
  
    @Get("match/history")
    @UseGuards(AuthGuard("jwt"))
    async getMatchHistory(@Req() req): Promise<any> {
      return this.gameService.getMatchHistory(req.user.id);
    }

    @Get("leaderboard")
    @UseGuards(AuthGuard("jwt"))
    async getLeaderboard(): Promise<any> {
      return this.gameService.getLeaderboard();
    }
  }
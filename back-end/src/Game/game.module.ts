import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { GameGateway } from './gateway/game/game.gateway';
import { GameService } from "./game.service";

@Module({
  providers: [GameGateway,UserService,GameService]
})
export class GameModule {}

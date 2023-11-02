import { Module } from "@nestjs/common";
import { UserService } from "../../user/user.service";
import { GameGateway } from './gateway/game/game.gateway';

@Module({
  providers: [GameGateway,UserService]
})
export class GameModule {}

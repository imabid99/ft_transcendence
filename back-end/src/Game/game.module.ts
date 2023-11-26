import { Module } from "@nestjs/common";
import { GameGateway } from './gateway/game/game.gateway';
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";

@Module({
  imports: [],
  providers: [GameGateway, GameService, NotificationGateway],
  controllers: [GameController],
})
export class GameModule {}

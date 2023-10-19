import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { ControllService } from './controll/controll.service';
import { GetewayService } from './geteway/geteway.service';

@Module({
  providers: [GameService, ControllService, GetewayService]
})
export class GameModule {}

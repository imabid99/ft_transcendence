import { Module } from "@nestjs/common";
import { friendshipController } from "./friendship.controller";
import { FriendshipService } from "./friendship.service";
import { NotificationModule } from "../notification/notification.module";

@Module({
  imports: [NotificationModule],
  providers: [FriendshipService],
  controllers: [friendshipController],
})
export class friendshipModule { }

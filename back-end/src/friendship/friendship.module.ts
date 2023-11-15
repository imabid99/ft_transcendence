import { Module } from "@nestjs/common";
import { friendshipController } from "./friendship.controller";
import { FriendshipService } from "./friendship.service";
import { NotificationModule } from "../notification/notification.module";
import { NotificationService } from "src/notification/notification.service";
import { UserService } from "src/user/user.service";

@Module({
  providers: [FriendshipService, NotificationService,UserService],
  controllers: [friendshipController],
})
export class friendshipModule { }
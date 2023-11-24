import { Module } from "@nestjs/common";
import { NotificationGateway } from "./gateway/notification.gateway";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
  imports: [],
  providers: [NotificationGateway, NotificationService ],
  controllers: [NotificationController],
})
export class NotificationModule { }

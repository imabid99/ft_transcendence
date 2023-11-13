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
import { NotificationService } from "./notification.service";
import { AuthGuard } from "@nestjs/passport";
import jwtDecode from "jwt-decode";

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) { }

  @Get("all")
  @UseGuards(AuthGuard("jwt"))
  async getNotifications(@Req() req): Promise<any> {
    return this.notificationService.getNotifications(req.user.id);
  }
}

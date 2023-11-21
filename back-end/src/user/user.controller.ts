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
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { chPass } from "../dtos/pass.dto";

@Controller("user")
export class userController {
  constructor(private userService: UserService) {}

  @Get("all")
  getUsers(@Headers() headers: any) {
    return this.userService.getUsers();
  }

  @Patch("pass")
  @UseGuards(AuthGuard("jwt"))
  changePass(@Req() req) {
    const chPass: chPass = req.body;
    if (chPass.newPassword && chPass.password) {
      return this.userService.changePass(chPass, req.user.id);
    } else return "Invalid input";
  }

  @Get("profiles")
  @UseGuards(AuthGuard("jwt"))
  profile() {
    return this.userService.getProfiles();
  }

  @Get("profile/:id")
  @UseGuards(AuthGuard("jwt"))
  pubProfile(@Param() params: any) {
    return this.userService.getProfile(params.id);
  }

  @Get("is-blocked/:userId/:tragetId")
  @UseGuards(AuthGuard("jwt"))
  async isBlocked(
    @Param("userId") userId: string,
    @Param("tragetId") tragetId: string
  ): Promise<{ iBlocked: boolean; heBlocked: boolean }> {
    return this.userService.isBlocked(userId, tragetId);
  }

  @Get("userinfo")
  @UseGuards(AuthGuard("jwt"))
  async getUserInfo(@Req() req): Promise<void> {
    
    return this.userService.getUserInfo(req.user.id);
  }

  @Delete("delete")
  @UseGuards(AuthGuard("jwt"))
  async deleteUser(@Req() req): Promise<void> {
    return this.userService.deleteUser(req.user.id);
  }

  @Get("check-username/:username")
  async checkUsername(@Param("username") username: string): Promise<boolean> {
    return this.userService.checkUsername(username);
  }

  @Get("check-email/:email")
  async checkEmail(@Param("email") email: string): Promise<boolean> {
    return this.userService.checkEmail(email);
  }

  @Patch("change-password")
  async changePassword(@Req() req): Promise<void> {
    return this.userService.changePassword(req.user.id, req.body);
  }

  @Patch("change-data")
  @UseGuards(AuthGuard("jwt"))
  async changeData(@Req() req): Promise<void> {
    return this.userService.changeData(req.user.id, req.body);
  }

}

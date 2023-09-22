import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Param,
  Headers,
  Request,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { chPass } from "./dtos/pass.dto";
import { JwtAuthGuard } from "./jwt-auth/jwt-auth.guard";

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

  @Get("intra")
  @UseGuards(AuthGuard("42"))
  Callback(@Req() req) {
    return this.userService.intraJWT(req.user.email);
  }

  @Get("profiles")
  @UseGuards(AuthGuard("jwt"))
  profile() {
    return this.userService.getProfiles();
  }

  @Get("profile/:id")
  @UseGuards(JwtAuthGuard)
  pubProfile(@Param() params: any) {
    return this.userService.getProfile(params.id);
  }

  @Get("42")
  @UseGuards(AuthGuard("42"))
  async fortyTwoCallback(@Req() req: Request): Promise<void> {
    console.log("here");
  }
  @Get("userinfo")
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Req() req): Promise<void> {
    return this.userService.getUserInfo(req.user.id);
  }
  @Get("is-blocked/:userId/:tragetId")
  @UseGuards(JwtAuthGuard)
  async isBlocked(
    @Param("userId") userId: string,
    @Param("tragetId") tragetId: string
  ): Promise<{ iBlocked: boolean; heBlocked: boolean }> {
    return this.userService.isBlocked(userId, tragetId);
  }
}

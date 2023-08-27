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
import { UserService } from "./user.service";
import { UserData } from "./dtos/user.dto";
import { UserDataLogin } from "./dtos/user-login.dto";
import { AuthGuard } from "@nestjs/passport";
import { chPass } from "./dtos/pass.dto";
import { JwtAuthGuard } from "./jwt-auth/jwt-auth.guard";
import jwtDecode from "jwt-decode";

@Controller("user")
export class userController {
  constructor(private userService: UserService) {}

  @Get("all")
  getUsers(@Headers() headers: any) {
    return this.userService.getUsers();
  }
  @Post("signup")
  signup(@Body() userData: UserData) {
    if (userData.email && userData.password)
      return this.userService.addUser(userData);
    else {
      return "invalid input";
    }
  }

  @Post("login")
  signin(@Body() userData: UserDataLogin) {
    if (userData.email && userData.password)
      return this.userService.login(userData);
    else {
      return "invalid input";
    }
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
  // @UseGuards(AuthGuard("jwt"))
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
  async getUserInfo(@Headers() headers: any): Promise<void> {
    return this.userService.getUserInfo(headers.authorization);
  }
  @Get("is-blocked/:userId/:tragetId")
  @UseGuards(JwtAuthGuard)
  async isBlocked(
    @Param("userId") userId: string,
    @Param("tragetId") tragetId: string
  ): Promise<{ iBlocked: boolean; heBlocked: boolean }> {
    return this.userService.isBlocked(userId, tragetId);
  }

  @Get("myChannels/:id")
  @UseGuards(JwtAuthGuard)
  async myChannels(@Param("id") id: string): Promise<any> {
    return this.userService.getMyChannels(id);
  }
}

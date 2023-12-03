import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { UserData } from "../dtos/user.dto";
import { UserDataLogin } from "../dtos/user-login.dto";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

@Controller("auth")
export class authController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post("login")
  signin(@Body() userData: UserDataLogin) : Promise<any> {
    return this.authService.login(userData);
  }
  @Post("signup")
  signup(@Body() userData: UserData) : Promise<any>{
    return this.authService.addUser(userData);
  }

  @Get("oauth2/42")
  @UseGuards(AuthGuard("42"))
  async auth42(): Promise<any> {
    return;
  }


  @Get("oauth2/42/callback")
  @UseGuards(AuthGuard("42"))
  Callback42(@Req() req, @Res() res) {
    if (req.user.type === "login")
      res.redirect("http://localhost:1337/login/validate/?token=" + req.user.token);
    else
      res.redirect("http://localhost:1337/signup/validate/?token=" + req.user.token);
  }

  @Get("oauth2/tempUser/:id")
  async tempUser(@Param("id") id:string): Promise<any> {
    return await this.authService.getTempUser(id);
  }

  @Post("oauth2/createUser")
  async userCreate(@Req() req): Promise<any> {
    // console.log(req.body);
    return await this.authService.validateOauthUser(req.body);
  }


  @Get("oauth2/google")
  @UseGuards(AuthGuard("google"))
  async authGoogle(): Promise<void> {
    return;
  }

  @Get("oauth2/google/callback")
  @UseGuards(AuthGuard("google"))
  CallbackGoogle(@Req() req,@Res() res) {
    if (req.user.type === "login")
      res.redirect("http://localhost:1337/login/validate/?token=" + req.user.token);
    else
      res.redirect("http://localhost:1337/signup/validate/?token=" + req.user.token);
  }

  @Get("2fa_qr")
  @UseGuards(AuthGuard("jwt"))
  async Get2FA_qr(@Req() req, @Res() res: Response): Promise<void> {
    const qrBuffer = await this.authService.generate2FAQrCode(req.user.id);

    res.setHeader("Content-Type", "image/png");
    res.send(qrBuffer);
  }
  @Patch("2fa_enable")
  @UseGuards(AuthGuard("jwt"))
  async enable2FA(@Req() req, @Body() body): Promise<any> {
    return await this.authService.enable2FA(req.user.id, body.twofactory);
  }

  @Patch("2fa_disable")
  @UseGuards(AuthGuard("jwt"))
  async disable2FA(@Req() req, @Body() body): Promise<any> {
    return await this.authService.disable2FA(req.user.id, body.twofactory);
  }

  @Post("2fa_verify")
  @UseGuards(AuthGuard("jwt"))
  async verify2FA(@Req() req, @Body() body): Promise<any> {
    return await this.authService.verify2FA(req.user.id, body.code);
  }
}

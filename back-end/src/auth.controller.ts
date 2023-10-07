import { Body, Controller, Get, Post, Req , UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { UserData } from "./dtos/user.dto";
import { UserDataLogin } from "./dtos/user-login.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class authController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post("login")
  signin(@Body() userData: UserDataLogin) {
    return this.authService.login(userData);
  }
  @Post("signup")
  signup(@Body() userData: UserData) {
    return this.authService.addUser(userData);
  }

  @Get("oauth2/42")
  @UseGuards(AuthGuard("42"))
  async auth42(): Promise<void> {
    return;
  }

  @Get("oauth2/42/callback")
  @UseGuards(AuthGuard("42"))
  Callback42(@Req() req): Promise<string> {
    return this.userService.intraJWT(req.user.email);
  }
  
  @Get("oauth2/google")
  @UseGuards(AuthGuard("google"))
  async authGoogle(): Promise<void> {
    return;
  }

  @Get("oauth2/google/callback")
  @UseGuards(AuthGuard("google")) 
  CallbackGoogle(@Req() req): Promise<string> {
    return this.userService.googleJWT(req.user.email);
  }
}

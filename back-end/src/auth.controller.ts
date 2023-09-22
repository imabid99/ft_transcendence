import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { UserData } from "./dtos/user.dto";
import { UserDataLogin } from "./dtos/user-login.dto";

@Controller("auth")
export class userController {
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
}

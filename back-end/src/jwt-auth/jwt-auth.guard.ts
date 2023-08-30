import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import * as jwt from "jsonwebtoken";
import { UserService } from "../user.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private userService: UserService
  ) {}

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const Request = context.switchToHttp().getRequest();
    const authHeader = Request.headers.authorization;
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return false;
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      if (!this.userService.getUsers()) {
        console.log("no users");
        return false;
      }
    } catch (err) {
      console.log("err :", err.message);
      return false;
    }
    return true;
  }
}

import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user.service";
export declare class JwtAuthGuard implements CanActivate {
    private readonly reflector;
    private readonly jwtService;
    private userService;
    constructor(reflector: Reflector, jwtService: JwtService, userService: UserService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}

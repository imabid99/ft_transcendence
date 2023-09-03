import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../user.service";
export declare class JwtAuthGuard implements CanActivate {
    private userService;
    constructor(userService: UserService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}

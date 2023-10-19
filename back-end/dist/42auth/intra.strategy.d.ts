import { UserService } from "../user/user.service";
import { AuthService } from "src/auth/auth.service";
declare const FortyTwoStrategy_base: new (...args: any[]) => any;
export declare class FortyTwoStrategy extends FortyTwoStrategy_base {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any>;
}
export {};

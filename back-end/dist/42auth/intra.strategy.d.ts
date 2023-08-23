import { UserService } from '../user.service';
declare const FortyTwoStrategy_base: new (...args: any[]) => any;
export declare class FortyTwoStrategy extends FortyTwoStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any>;
}
export {};

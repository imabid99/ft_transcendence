import { UserService } from "./user.service";
import { UserData } from "./dtos/user.dto";
import { UserDataLogin } from "./dtos/user-login.dto";
export declare class userController {
    private userService;
    constructor(userService: UserService);
    getUsers(headers: any): Promise<import(".prisma/client").User[]>;
    signup(userData: UserData): Promise<"User created" | "user exist"> | "invalid input";
    signin(userData: UserDataLogin): Promise<string> | "invalid input";
    changePass(req: any): Promise<"invalid password" | "Changed successfully"> | "Invalid input";
    Callback(req: any): Promise<string>;
    profile(): Promise<import(".prisma/client").Profile[]>;
    LastMessage(params: any): Promise<import(".prisma/client").Message[]>;
    pubProfile(params: any): Promise<import(".prisma/client").Profile | "Not found">;
    messages(params: any): Promise<any>;
    fortyTwoCallback(req: Request): Promise<void>;
    getUserInfo(headers: any): Promise<void>;
    isBlocked(userId: string, tragetId: string): Promise<{
        iBlocked: boolean;
        heBlocked: boolean;
    }>;
    myChannels(id: string): Promise<any>;
    channel(id: string, headers: any): Promise<any>;
}

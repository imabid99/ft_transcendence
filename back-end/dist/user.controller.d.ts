import { UserService } from "./user.service";
export declare class userController {
    private userService;
    constructor(userService: UserService);
    getUsers(headers: any): Promise<import(".prisma/client").User[]>;
    changePass(req: any): Promise<void> | "Invalid input";
    profile(): Promise<import(".prisma/client").Profile[]>;
    pubProfile(params: any): Promise<import(".prisma/client").Profile>;
    isBlocked(userId: string, tragetId: string): Promise<{
        iBlocked: boolean;
        heBlocked: boolean;
    }>;
    getUserInfo(req: any): Promise<void>;
}

import { PrismaService } from "./prisma/prisma.service";
import { UserData } from "./dtos/user.dto";
import { UserDataLogin } from "./dtos/user-login.dto";
import { chPass } from "./dtos/pass.dto";
import * as jwt from "jsonwebtoken";
export declare class UserService {
    private prisma;
    checkMute(arg0: number, groupId: string): {
        iMute: boolean;
        heMute: boolean;
    } | PromiseLike<{
        iMute: boolean;
        heMute: boolean;
    }>;
    constructor(prisma: PrismaService);
    getUsers(): Promise<import(".prisma/client").User[]>;
    getProfiles(): Promise<import(".prisma/client").Profile[]>;
    addUser(userData: UserData): Promise<"User created" | "user exist">;
    generateToken(userId: number, username: string, email: string): string;
    login(userData: UserDataLogin): Promise<string>;
    changePass(pass: chPass, id: string): Promise<"invalid password" | "Changed successfully">;
    intraJWT(email: string): Promise<string>;
    validateUser(data: any): Promise<import(".prisma/client").User>;
    getProfile(id: string): Promise<import(".prisma/client").Profile | "Not found">;
    validateJwtToken(token: string): Promise<string | jwt.JwtPayload>;
    validateIntraUser(user: any): Promise<any>;
    getUserInfo(token: string): Promise<any>;
    isBlocked(id: string, userId: string): Promise<{
        iBlocked: boolean;
        heBlocked: boolean;
    }>;
}
